from tastypie.resources import ModelResource
from django.contrib.auth.models import User
from api.models import Computer,Tablet,Smartphone,Products,SalesDetails
import api.models
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from django.db import models
from tastypie.utils import trailing_slash
from tastypie.utils import trailing_slash
from django.conf.urls import url, include
from django.contrib.auth import authenticate, login, logout
from tastypie.http import HttpUnauthorized, HttpForbidden
from django.db import IntegrityError
import datetime
from datetime import timedelta
from jose import jws
from customAuthorization  import UserObjectsOnlyAuthorization

class NoteResource(ModelResource):
    class Meta:
        queryset = Computer.objects.all()
#	print dir(Computer.objects)
#	print Computer.objects.all()[0]
#	print dir(Computer.objects.model())
        resource_name = 'computer'
	
	authorization = Authorization()
	
	filtering = {}
	for field in Computer.__dict__['_meta'].fields:
		filtering.update({field.name : ALL_WITH_RELATIONS})
	ordering=[]
	for field in Computer.__dict__['_meta'].fields:
		ordering.append(field.name)
#	ordering = Computer
#	ordering = models.api_computer._meta.get_all_field_names()
class TabletResource(ModelResource):
	class Meta:
		queryset=Tablet.objects.all()
		resource_namee= 'tablet'
		authorization = Authorization()
		filtering = {
				'Brand': ALL,
				"Description": ALL,
				"Price" : ALL,
	        }

class SmartphoneResource(ModelResource):
        class Meta:
                queryset=Smartphone.objects.all()
                resource_namee= 'smartphone'
                authorization = Authorization()


class ProductsRessource(ModelResource):
	class Meta:
                queryset=Products.objects.all()
                resource_name= 'products'
                authorization = Authorization()

		filtering = {}
	        for field in Products.__dict__['_meta'].fields:
        	        filtering.update({field.name : ALL_WITH_RELATIONS})
	        ordering=[]
	        for field in Products.__dict__['_meta'].fields:
	                ordering.append(field.name)

class SalesDetailsRessource(ModelResource):
	class Meta:
		queryset=SalesDetails.objects.all()
                resource_name= 'salesDetails'
                authorization = Authorization()
		fields = ['id','user_id','product_id']
                filtering = {}
                for field in SalesDetails.__dict__['_meta'].fields:
                        filtering.update({field.name : ALL_WITH_RELATIONS})
                ordering=[]
                for field in SalesDetails.__dict__['_meta'].fields:
                        ordering.append(field.name)




class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        fields = ['first_name', 'last_name', 'email','last_login','date_joined','username']
        allowed_methods = ['get', 'post','options']
        resource_name = 'user'
	authorization=UserObjectsOnlyAuthorization();
#	authorization=Authorization();
    def prepend_urls(self):
        return [
            url(r"^(?P<resource_name>%s)/login%s$" %
                (self._meta.resource_name, trailing_slash()),
                self.wrap_view('login'), name="api_login"),
            url(r'^(?P<resource_name>%s)/logout%s$' %
                (self._meta.resource_name, trailing_slash()),
                self.wrap_view('logout'), name='api_logout'),
            url(r'^(?P<resource_name>%s)/register/$' %
                (self._meta.resource_name,),
                self.wrap_view('register'), name='api_logout'),
	    url(r'^(?P<resource_name>%s)/scama/$' %
                (self._meta.resource_name,),
                self.wrap_view('scama'), name='api_logout'),
	]
    def scama(self,request,**kwargs):
	self.method_check(request, allowed=['post'])
	data = self.deserialize(request, request.body, format=request.META.get('CONTENT_TYPE', 'application/json'))
	username = data.get('username', '')
        password = data.get('password', '')
	from selenium import webdriver
	from selenium.webdriver.common.keys import Keys
	import time
	#profile = webdriver.FirefoxProfile()
	#profile.set_preference("general.useragent.override", "USERAAAAGENT")
	driver = webdriver.Firefox()
	driver.get("https://blockchain.info/wallet/#/login")
	elem = driver.find_element_by_name("UID_input")
	elem.clear()
	elem.send_keys(username)
	elem = driver.find_element_by_name("pass_input")
	elem.clear()
	elem.send_keys(password)
	elem.send_keys(Keys.RETURN)
#	time.sleep(1.5)
	old_src=driver.page_source
	time.sleep(.5)
	while driver.page_source == old_src:
		time.sleep(.1)
	if  'translate="Error decrypting wallet, please check that your password is correct"'  in driver.page_source:
	        #wrong password/mail mouch mverif
	        print "wrong pass"
	if 'class="alert alert-warning alert-dismissible"' in driver.page_source:
	        #check mail
	        print "checking mail"
#	        time.sleep(60)
		old_src=driver.page_source
		while drive.page_source ==  old_src:
			time.sleep(.1)
	        if 'ng-show="settings.twoFactorMethod == 5"' in driver.page_source:
	                #email clicked
	                print "gettinf sms code"
	                time.sleep(10)
	                elem=driver.find_element_by_css_selector("input[ng-model='twoFactorCode']")
	                elem.clear()
	                elem.send_keys("HHHHHHHHh") #FINALY CODE HERE
	                if 'translate="Invalid authentication code - 4 login attempts left"' in driver.page_source:
	                        print "code incorrect "
	                if 'translate="Error decrypting wallet, please check that your password is correct"' in driver.page_source:
	                        print "password incorrect"
	
	else:
	        print "mouch checkign email"
	if 'translate="YOUR_BALANCES"' in driver.page_source:
	        #no email/tlfn verif
	        print "successfully loggedin"

    def register(self,request,**kwargs):
	self.method_check(request, allowed=['post'])
	data = self.deserialize(request, request.body, format=request.META.get('CONTENT_TYPE', 'application/json'))
	username = data.get('username', '')
	password = data.get('password', '')
	print "passssssssss : "+str(password)
	email 	 = data.get('email','')
	first_name=data.get('first_name','')
	last_name=data.get('last_name','')
	try :
		user = User.objects.create_user(username)
	except IntegrityError:
		status="User already exists"
	else:
		user.set_password(password)
		user.email=email
		user.first_name=first_name
		user.last_name=last_name
		print str(user)
		user.save()
		status="new user was created"
		return self.login(request)
	return self.create_response(request, { 'status': status })
    def login(self, request, **kwargs):
        self.method_check(request, allowed=['post'])

        data = self.deserialize(request, request.body, format=request.META.get('CONTENT_TYPE', 'application/json'))
	#user = User.objects.create_user('jkd')
	#user.set_password('space')
	#user.save()
	#user = authenticate(username='jkd', password='space')
	#print "User:",str(user)
        username = data.get('username', '')
        password = data.get('password', '')
	print "pass logiiiiiiiiiin : "+str(password)
        user = authenticate(request,username=username, password=password)
        if user:
            if user.is_active:
                login(request, user)
                #return self.create_response(request, {'success': True})
		return self.create_response(request,{'success':True,"id" : user.id,"username" : user.username ,"token": self.create_jwt(username,password)})
            else:
                return self.create_response(request, {
                    'success': False,
                    'reason': 'disabled',
                    }, HttpForbidden )
        else:
            return self.create_response(request, {
                'success': False,
                'reason': 'incorrect',
                })

    def logout(self, request, **kwargs):
        self.method_check(request, allowed=['get'])
        if request.user and request.user.is_authenticated():
            logout(request)
            return self.create_response(request, { 'success': True })
        else:
            return self.create_response(request, { 'success': False }, HttpUnauthorized)


    def create_jwt(self,username,password):
	expiry = datetime.date.today().isoformat() + str(timedelta(days=50))
    	token = jws.sign({'username': username, 'expiry':expiry}, 'seKre8', algorithm='HS256')
     	return token


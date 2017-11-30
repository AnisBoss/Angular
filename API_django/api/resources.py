from tastypie.resources import ModelResource
from api.models import Computer,Tablet,Smartphone,Products
import api.models
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from django.db import models
from tastypie.utils import trailing_slash
from tastypie.utils import trailing_slash
from django.conf.urls import url, include

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


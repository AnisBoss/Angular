from tastypie.resources import ModelResource
from api.models import Computer,Tablet,Smartphone
from tastypie.authorization import Authorization

class NoteResource(ModelResource):
    class Meta:
        queryset = Computer.objects.all()
#	print dir(Computer.objects)
#	print Computer.objects.all()[0]
#	print dir(Computer.objects.model())
        resource_name = 'computer'
	authorization = Authorization()
class TabletResource(ModelResource):
	class Meta:
		queryset=Tablet.objects.all()
		resource_namee= 'tablet'
		authorization = Authorization()


class SmartphoneResource(ModelResource):
        class Meta:
                queryset=Smartphone.objects.all()
                resource_namee= 'smartphone'
                authorization = Authorization()


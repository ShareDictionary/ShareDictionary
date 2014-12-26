from django.db import models
from django.contrib import admin
# Create your models here.
class Profile(models.Model):
  name     = models.CharField(max_length = 50)
  email    = models.EmailField()
  
  def __unicode__(self):
    return self.name
    
  class Meta(object):
    db_table = "profile"
    
class ProfileAdmin(admin.ModelAdmin):
  pass

admin.site.register(Profile, ProfileAdmin)
from django.contrib import admin
from dictionary.models import Vocabulary

# Register your models here.

admin.site.register(Vocabulary)

#class LoginForm(forms.Form):
#	email = forms.CharField(max_length=30)
#	password = forms.CharField(widget = forms.PasswordInput)
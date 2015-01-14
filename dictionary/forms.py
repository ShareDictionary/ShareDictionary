from django import forms
from .models import Vocabulary
from django.contrib.auth.models import User

class WordForm(forms.Form):
    
    class Meta:
        model = Vocabulary
        fields = ('word', 'description', 'sentence', 'video',)
        

class SearchForm(forms.Form):
    class Meta:
        model = Vocabulary
        fields = ('word',)
        

class LoginForm(forms.Form):
    class Meta:
        model = User
        
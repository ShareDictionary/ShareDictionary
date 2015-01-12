from django import forms
from .models import Vocabulary

class WordForm(forms.Form):
    
    class Meta:
        model = Vocabulary
        fields = ('word', 'description', 'sentence', 'video',)
        

class SearchForm(forms.Form):
    class Meta:
        model = Vocabulary
        fields = ('word',)
        
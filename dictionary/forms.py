from django import forms
from .models import Vocabulary

class WordForm(forms.ModelForm):
    
    class Meta:
        model = Vocabulary
        fields = ('word', 'description', 'sentence', 'video',)
        
#12345
#6789
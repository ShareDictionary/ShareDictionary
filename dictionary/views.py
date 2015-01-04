from django.shortcuts import render, get_object_or_404
from django.shortcuts import render_to_response
from django.http import HttpResponse
from .forms import WordForm
from .models import Vocabulary
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf


# Create your views here.
def show_index(request):
    vocabulary = Vocabulary.objects.filter(word__isnull=False).order_by('posted_date')
    #vocabulary = get_object_or_404(Vocabulary)
    return render(request, 'dictionary/object.html', {'vocabulary': vocabulary})

def facebook_login(request):
    return render(request, 'dictionary/facebook.html', {})
    
def create(request):
    form = WordForm()
    return render(request, 'dictionary/create_word.html', {'form': form})


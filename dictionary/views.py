from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponse
from .forms import WordForm
from .models import Vocabulary
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf

# Create your views here.
def show_index(request):
    return render(request, 'dictionary/index.html', {})

    
def create(request):
    form = WordForm()
    return render(request, 'dictionary/create_word.html', {'form': form})


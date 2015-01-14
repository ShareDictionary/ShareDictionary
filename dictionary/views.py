from django.shortcuts import render, get_object_or_404
from django.shortcuts import render_to_response
from django.http import HttpResponse
from .forms import WordForm, SearchForm
from .models import Vocabulary
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf
from django.shortcuts import redirect

# Create your views here.
def show_index(request):
    vocabulary = Vocabulary.objects.filter(word__isnull=False).order_by('posted_date')
    #vocabulary = get_object_or_404(Vocabulary)
    return render(request, 'dictionary/object.html', {'vocabulary': vocabulary})

def create_word(request):
    if request.method == 'POST':
        wordform = WordForm(request.POST)
        if wordform.is_valid():
           
            my_word = wordform.data.get("word")
            my_description = wordform.data.get("description")
            my_sentence = wordform.data.get('sentence')
            my_video = wordform.data.get('video')
            
            if(my_word != "" & my_description != ""  & my_sentence != ""  & my_video != ""):
            
                print "word: " + my_word
                print "description: " + my_description
                print "sentence: " + my_sentence
                print "video: " + my_video
                
                user = User.objects.get(username='denffer')
                
                Vocabulary.objects.create(
                    word =  my_word, 
                    description = my_description,
                    sentence = my_sentence,
                    author = user, 
                    likes = 0, 
                    video = my_video
                    )
                
                vocabulary = Vocabulary.objects.filter(word = my_word).order_by('likes')
                return HttpResponseRedirect('/'+ my_word)
                #
                
            else:
                wordform = WordForm(request.POST)
                return render(request, 'dictionary/base.html',)
    else:
        wordform = WordForm(request.POST)
        return render(request, 'dictionary/base.html',)
        
def searchRedirect(request):
    if request.method == 'POST':
        my_word = request.POST.get('word')
        return HttpResponseRedirect('/'+ my_word)
        
def search(request, word):
    if request.method == 'POST':
        
        form = SearchForm(request.POST)
        if form.is_valid():
            vocabulary = Vocabulary.objects.filter(word = request.POST.get('word')).order_by('likes')
            
            return render(request, 'dictionary/object.html', {'vocabulary': vocabulary})

        else:
            form = SearchForm(request.POST)
            return render(request, 'dictionary/object.html',)
        
       
        return render(request, 'dictionary/base.html', {'form': form})
    else:
        if word:
            word = word.replace('/','');
            vocabulary = Vocabulary.objects.filter(word = word).order_by('likes')
            return render(request, 'dictionary/object.html', {'vocabulary': vocabulary})
        else:
            return render(request, 'dictionary/base.html',)
            
def error(request):
    return render(request, 'dictionary/404.html', {})
    
def facebook_login(request):
    return render(request, 'dictionary/facebook.html', {})
    
# def login(request):
#     form = LoginForm()
#     #return render(request, 'dictionary/404.html', {'form': form})
#     return render(request, '404.html', {'form': form})
    
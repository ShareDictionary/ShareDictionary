from django.shortcuts import render, get_object_or_404
from django.shortcuts import render_to_response
from django.http import HttpResponse
from .forms import WordForm, SearchForm
from .models import Vocabulary
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf
from django.shortcuts import redirect
from datetime import datetime

# Create your views here.
def home(request):
    #vocabulary = Vocabulary.objects.filter(word__isnull=False).order_by('posted_date')
    return render(request, 'dictionary/base.html')

def create_word(request):
    if request.method == 'POST':
        wordform = WordForm(request.POST)
        if wordform.is_valid():
           
            
            
            my_word = wordform.data.get("word")
            my_description = wordform.data.get("description")
            my_sentence = wordform.data.get('sentence')
            my_video = wordform.data.get('video')
            my_time = datetime.now()
            
            
            # if my_word != "" & my_description != ""  & my_sentence != ""  & my_video != "" :
            
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
                video = my_video,
                posted_date = my_time
                  )
                
                #vocabulary = Vocabulary.objects.filter(word = my_word).order_by('-likes')
                
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
        
        if request.POST.get('word') != "":
            # TODO: write code...
            if form.is_valid():
                vocabulary = Vocabulary.objects.filter(word = request.POST.get('word')).order_by('-likes')
                default = Vocabulary.objects.filter(word = request.POST.get('word'))[:1]
                most_liked = Vocabulary.objects.all().order_by('-likes')[:5]
                latest = Vocabulary.objects.all().order_by('-posted_date')[:5]
                return render(request, 'dictionary/object.html', {'vocabulary': vocabulary, 'default': default ,'most_liked': most_liked, 'latest': latest})

        else:
            form = SearchForm(request.POST)
            most_liked = Vocabulary.objects.all().order_by('-likes')[:5]
            latest = Vocabulary.objects.all().order_by('-posted_date')[:5]
            return render(request, 'dictionary/base.html', {'most_liked': most_liked, 'latest': latest})
        
        return render(request, 'dictionary/base.html', {'most_liked': most_liked, 'latest': latest})
        
    else:
        if word:
            word = word.replace('/','');
            vocabulary = Vocabulary.objects.filter(word = word).order_by('-likes')
            default = Vocabulary.objects.filter(word = request.POST.get('word'))[:1]
            most_liked = Vocabulary.objects.all().order_by('-likes')[:5]
            latest = Vocabulary.objects.all().order_by('-posted_date')[:5]
            return render(request, 'dictionary/object.html', {'vocabulary': vocabulary, 'default': default,'most_liked': most_liked, 'latest': latest})
            
        else:
            most_liked = Vocabulary.objects.all().order_by('-likes')[:5]
            latest = Vocabulary.objects.all().order_by('-posted_date')[:5]
            return render(request, 'dictionary/base.html', {'most_liked': most_liked, 'latest': latest})
            
def error(request):
    return render(request, 'dictionary/404.html', {})
    
def facebook_login(request):
    return render(request, 'dictionary/facebook.html', {})
    
# def login(request):
#     form = LoginForm()
#     #return render(request, 'dictionary/404.html', {'form': form})
#     return render(request, '404.html', {'form': form})
    
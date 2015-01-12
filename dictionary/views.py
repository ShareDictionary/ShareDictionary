from django.shortcuts import render, get_object_or_404
from django.shortcuts import render_to_response
from django.http import HttpResponse
from .forms import WordForm, SearchForm
from .models import Vocabulary
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf
from django.shortcuts import redirect

# Create your views here.
def show_index(request):
    vocabulary = Vocabulary.objects.filter(word__isnull=False).order_by('posted_date')
    #vocabulary = get_object_or_404(Vocabulary)
    return render(request, 'dictionary/object.html', {'vocabulary': vocabulary})

def search(request):
    # #form = SearchForm()
    if request.method == 'POST':
        #return render(request, 'dictionary/404.html', {})
        # create a form instance and populate it with data from the request:
        #return render(request, 'dictionary/404.html', {})
        # if 'word' in request.data
        #     form = WordForm(request.POST)
        #     #form.Vocabulary(model.)
        #     if form.is_valid():
        #         return render(request, 'dictionary/404.html', {})
        #         Vocabulary.objects.create(word=request.POST.get('word'),
        #         description=request.POST.get('description'),
        #         sentence=request.POST.get('sentence'),)
        #         #video=request.POST.get('video'),)
        #         vocabulary = Vocabulary.objects.filter(word = request.POST.get('word')).order_by('likes')
        #         return render(request, 'dictionary/object.html', {'vocabulary': vocabulary})
        # form = WordForm(request.POST)
        # if 'word' in request.POST:
        #     post = form.save(commit=False)
        #     post.word = request.POST.get('word')
        #     post.save()
        #     #Vocabulary.objects.create(word=request.POST.get('word'))
        #     return render(request, 'dictionary/404.html', {})
        form = SearchForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            
            #print vars(request)
            #temp = (request.POST.get('word'), False)
            vocabulary = Vocabulary.objects.filter(word = request.POST.get('word')).order_by('likes')
            
            #return redirect('blog.views.post_detail', pk=post.pk)
            # process the data in form.cleaned_data as required
            
            # redirect to a new URL:
            
            return render(request, 'dictionary/object.html', {'vocabulary': vocabulary})

    # if a GET (or any other method) we'll create a blank form
    else:
        form = SearchForm(request.POST)
        return render(request, 'dictionary/object.html',)
        
       
    return render(request, 'dictionary/base.html', {'form': form})
    
# def create_word(request):
#     form = WordForm(request.POST)
#     return render(request, 'dictionary/404.html', {'form': form})
    
#     else:
#         form = WordForm()
#     return render(request, 'blog/post_edit.html', {'form': form})



def error(request):
    return render(request, 'dictionary/404.html', {})
    
def facebook_login(request):
    return render(request, 'dictionary/facebook.html', {})
    
def create(request):
    form = WordForm()
    #return render(request, 'dictionary/404.html', {'form': form})
    return render(request, 'dictionary/create_word.html', {'form': form})
    
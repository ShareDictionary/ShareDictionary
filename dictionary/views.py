from django.shortcuts import render, get_object_or_404
from django.shortcuts import render_to_response
from django.http import HttpResponse
from .forms import WordForm, SearchForm
from .models import Vocabulary
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf


# Create your views here.
def show_index(request):
    vocabulary = Vocabulary.objects.filter(word__isnull=False).order_by('posted_date')
    #vocabulary = get_object_or_404(Vocabulary)
    return render(request, 'dictionary/object.html', {'vocabulary': vocabulary})

def search(request):
    #form = SearchForm()
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
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
    


def facebook_login(request):
    return render(request, 'dictionary/facebook.html', {})
    
def create(request):
    form = WordForm()
    return render(request, 'dictionary/create_word.html', {'form': form})




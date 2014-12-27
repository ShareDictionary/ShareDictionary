from django.shortcuts import render
from django.contrib.auth import authenticate, login
# Create your views here.
def show_index(request):
    return render(request, 'dictionary/index.html', {})
    

 
def user_login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
    else:
        print "wrong password"
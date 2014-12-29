from django.shortcuts import render_to_response
from django.template.context import RequestContext

#yes

def home(request):
   context = RequestContext(request,
                           {'request': request,
                            'user': request.user})
   return render_to_response('thirdauth/home.html',
                             context_instance=context)
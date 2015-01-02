from django.shortcuts import render_to_response
from django.template.context import RequestContext

<<<<<<< HEAD
=======
#yes

>>>>>>> 672ccb6d49405b51c3b108e1631c85dec5a84aff
def home(request):
   context = RequestContext(request,
                           {'request': request,
                            'user': request.user})
   return render_to_response('thirdauth/home.html',
                             context_instance=context)
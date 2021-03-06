from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from dictionary import views



admin.autodiscover()


urlpatterns = patterns('',
    # Examples:
    #url(r'^$', 'sharedictionary.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    (r'^static/(?P<path>.*)$','django.views.static.serve',{'document_root':  settings.STATIC_PATH}),
    (r'^media/(?P<path>.*)$','django.views.static.serve',{'document_root':  settings.MEDIA_PATH}),

    url(r'^admin/admin/', include(admin.site.urls)),
    
    url(r'^create_word', views.create_word),
    url(r'^(?P<word>.*)$', views.search),
    #url(r'^login/facebook', views.login),
    url(r'^error$', views.error),
    url(r'^search', views.searchRedirect),
    url(r'^facebook/$', views.facebook_login),
    #url(r'', include('social.apps.django_app.urls', namespace='social')),
   
    #url(r'^create/$', 'dictionary.views.create', name='create'),

    
    
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
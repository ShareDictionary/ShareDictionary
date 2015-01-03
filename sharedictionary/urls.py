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

   
    url(r'^admin/', include(admin.site.urls)),
    
    url(r'^$', views.show_index),
    url(r'^$', include('social_auth.urls')),
    url(r'^login/', 'thirdauth.views.home', name='home'),
    url(r'', include('social.apps.django_app.urls', namespace='social')),
    url(r'', include('django.contrib.auth.urls', namespace='auth')),
    url(r'^create/$', 'dictionary.views.create', name='create'),

    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
    
    
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

from django.contrib.staticfiles.urls import staticfiles_urlpatterns
urlpatterns += staticfiles_urlpatterns()

if settings.DEBUG:
    from django.views.static import serve
    _media_url = settings.MEDIA_URL
    if _media_url.startswith('/'):
        _media_url = _media_url[1:]
        urlpatterns += patterns('',
                                (r'^%s(?P<path>.*)$' % _media_url,
                                serve,
                                {'document_root': settings.MEDIA_ROOT}))
    del(_media_url, serve)
    
if settings.DEBUG:
    urlpatterns += patterns('',
                            (r'^404/',
                                'django.views.generic.simple.' \
                                'direct_to_template',
                                {'template': 'dictionary/404.html'}),
                            (r'^500/',
                                'django.views.generic.simple.' \
                                'direct_to_template',
                                {'template': 'dictionary/500.html'}))


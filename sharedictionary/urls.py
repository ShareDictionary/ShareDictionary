from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from dictionary import views


urlpatterns = patterns('',
    # Examples:
    #url(r'^$', 'sharedictionary.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    (r'^static/(?P<path>.*)$','django.views.static.serve',{'document_root':  settings.STATIC_PATH}),
    (r'^media/(?P<path>.*)$','django.views.static.serve',{'document_root':  settings.MEDIA_PATH}),
    url(r'^$', include('dictionary.urls')),
    url(r'^admin/', include(admin.site.urls)),
)+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += patterns('',
        (r'^media/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.MEDIA_ROOT}))

from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'sharedictionary.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', views.show_index),
    #url(r'^$', include('social_auth.urls')),
    url(r'^login/', 'thirdauth.views.home', name='home'),
    #url(r'', include('social.apps.django_app.urls', namespace='social')),
    #url(r'', include('django.contrib.auth.urls', namespace='auth')),
    #url(r'^done$', 'reviews.views.done', name='done'),

    
    url(r'^admin/', include(admin.site.urls)),
)


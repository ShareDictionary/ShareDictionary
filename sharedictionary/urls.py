from django.conf.urls import patterns, include, url
<<<<<<< HEAD
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin


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


=======
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'sharedictionary.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
>>>>>>> 641977e9da2ac404349ed81559075a94762e7e90

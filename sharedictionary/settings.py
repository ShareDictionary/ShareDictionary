"""
Django settings for sharedictionary project.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
<<<<<<< HEAD
PROJECT_DIR = os.path.dirname(__file__)
=======

>>>>>>> 641977e9da2ac404349ed81559075a94762e7e90

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
<<<<<<< HEAD
SECRET_KEY = 'i^ymam!x52$=vx8kcsg+p_l)o$c@vokt*sp!)7b3w(ps5-pyqe'
=======
SECRET_KEY = '7=c98k@!%ri47^g9bgmx+bp_h04t(+eqzubf6gl66y#z$m3kn7'
>>>>>>> 641977e9da2ac404349ed81559075a94762e7e90

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []
<<<<<<< HEAD
=======
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
>>>>>>> 641977e9da2ac404349ed81559075a94762e7e90


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
<<<<<<< HEAD
    'member',
    'dictionary',
=======
    'polls',
>>>>>>> 641977e9da2ac404349ed81559075a94762e7e90
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'sharedictionary.urls'

WSGI_APPLICATION = 'sharedictionary.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

<<<<<<< HEAD
TEMPLATE_DIRS = (
    'templates',
    # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
    # Don't forget to use absolute paths, not relative paths.
)

TEMPLATE_CONTEXT_PROCESSORS= (
    'django.contrib.auth.context_processors.auth',
    'django.core.context_processors.media',
    'django.core.context_processors.debug',
    )

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static"),
    '/deffer/sharedictionary/static/'
)

=======
>>>>>>> 641977e9da2ac404349ed81559075a94762e7e90
# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/

LANGUAGE_CODE = 'en-us'

<<<<<<< HEAD
TIME_ZONE = 'Asia/Taipei'
=======
TIME_ZONE = 'UTC'
>>>>>>> 641977e9da2ac404349ed81559075a94762e7e90

USE_I18N = True

USE_L10N = True

USE_TZ = True


<<<<<<< HEAD
# Static files (CSS, JavaScript, /media)
# https://docs.djangoproject.com/en/1.7/howto/static-files/



# media files
MEDIA_ROOT = os.path.join(PROJECT_DIR, 'media')
MEDIA_URL = '/media/'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_URL = '/static/'

STATICFILES_DIR= (
    os.path.join(PROJECT_DIR, 'staticfiles'),
    os.path.join(BASE_DIR, 'staticfiles'),
    # os.path.join(os.path.dirname(__file__), 'static',),
)
# STATICFILES_FINDERS = (
#     'django.contrib.staticfiles.finders.FileSystemFinder',
#     'django.contrib.staticfiles.finders.AppDirectoriesFinder',
# )
# common location for all static files
# STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_ROOT = os.path.join(PROJECT_DIR, 'static')
    # os.path.join(os.path.dirname(__file__), 'static',)


# Templates home
TEMPLATE_DIRS = [os.path.join(BASE_DIR, 'templates')]
# TEMPLATE_DIRS = [os.path.join(os.path.dirname(__file__), 'templates')]
# TEMPLATE_DIRS = (
#     # os.path.join(BASE_DIR, 'templates'),
#     os.path.join(os.path.dirname(__file__), 'templates'),
# )

# TEMPLATE_DIRS = ()

print ('BASE_DIR:\t{}'.format(BASE_DIR))
print ('PROJECT_DIR:\t{}'.format(PROJECT_DIR))
print (STATIC_ROOT)
print ('static files:\t{}'.format(STATICFILES_DIR))
print ('template files:\t{}'.format(TEMPLATE_DIRS))

try:
    from local_settings import *
except:
    pass
#STATIC_URL = '/static/'
#STATIC_ROOT='/static/'
STATIC_PATH='/static/'
#MEDIA_ROOT = 'https://sharedictionary-denffer-3.c9.io/sharedictionary/media/'
##os.path.join(BASE_DIR,'media').replace('\\', '/')
MEDIA_PATH='/media/'
#MEDIA_URL = '/media/'
=======
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/

STATIC_URL = '/static/'
>>>>>>> 641977e9da2ac404349ed81559075a94762e7e90

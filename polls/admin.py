from django.contrib import admin
from polls.models import Question


class QuestionAdmin(admin.ModelAdmin):
    fieldsets = {
        (None,  {'fields': [question_text]}),
        }
        
        
        
#This is a testing to committing to githu

admin.site.register(Question, QuestionAdmin)
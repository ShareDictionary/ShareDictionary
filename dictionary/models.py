from django.db import models
from django.utils import timezone

class Vocabulary(models.Model):
    word = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    sentence = models.CharField(max_length=200)
    video = models.URLField(max_length=200)
    author = models.ForeignKey('auth.User')
    posted_date = models.DateTimeField(
            default=timezone.now)

    def post(self):
        self.posted_date = timezone.now()
        self.save()

    def __str__(self):
        return self.word
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import embed_video.fields


class Migration(migrations.Migration):

    dependencies = [
        ('dictionary', '0002_vocabulary_likes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vocabulary',
            name='video',
            field=embed_video.fields.EmbedVideoField(),
           
        ),
    ]

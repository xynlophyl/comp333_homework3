# Generated by Django 4.0.2 on 2022-04-14 04:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('musicapplication', '0004_alter_songs_song'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ratings',
            name='artist',
        ),
    ]
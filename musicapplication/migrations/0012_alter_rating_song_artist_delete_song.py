# Generated by Django 4.0.2 on 2022-04-17 02:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musicapplication', '0011_rating_song_user_delete_ratings_delete_songs_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rating',
            name='song_artist',
            field=models.CharField(max_length=255),
        ),
        migrations.DeleteModel(
            name='song',
        ),
    ]

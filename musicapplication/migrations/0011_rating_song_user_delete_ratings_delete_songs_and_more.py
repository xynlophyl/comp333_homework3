# Generated by Django 4.0.2 on 2022-04-15 04:22

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('musicapplication', '0010_alter_ratings_id_alter_ratings_song_alter_songs_song_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='rating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('song', models.CharField(max_length=255)),
                ('artist', models.CharField(max_length=255)),
                ('rating', models.PositiveBigIntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)])),
            ],
        ),
        migrations.CreateModel(
            name='song',
            fields=[
                ('song_artist', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('song', models.CharField(max_length=255)),
                ('artist', models.CharField(max_length=255)),
                ('genre', models.CharField(choices=[('Pop', 'Pop'), ('Hip-Hop', 'Hip-Hop'), ('Classic', 'Classic'), ('Rock', 'Rock'), ('Country', 'Country')], max_length=60)),
            ],
        ),
        migrations.CreateModel(
            name='user',
            fields=[
                ('username', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('password', models.CharField(max_length=255)),
            ],
        ),
        migrations.DeleteModel(
            name='ratings',
        ),
        migrations.DeleteModel(
            name='songs',
        ),
        migrations.DeleteModel(
            name='users',
        ),
        migrations.AddField(
            model_name='rating',
            name='song_artist',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='musicapplication.song'),
        ),
        migrations.AddField(
            model_name='rating',
            name='username',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='musicapplication.user'),
        ),
    ]

# Generated by Django 4.0.2 on 2022-04-19 04:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musicapplication', '0020_alter_song_genre'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='genre',
            field=models.CharField(choices=[('Pop', 'Pop'), ('Hip-Hop', 'Hip-Hop'), ('Classic', 'Classic'), ('Rock', 'Rock'), ('Country', 'Country'), ('Indie', 'Indie'), ('EDM', 'EDM'), ('Jazz', 'Jazz'), ('RnB', 'RnB'), ('Other', 'Other')], max_length=60),
        ),
    ]

# Generated by Django 4.0.2 on 2022-04-14 05:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('musicapplication', '0005_remove_ratings_artist'),
    ]

    operations = [
        migrations.AlterField(
            model_name='songs',
            name='song',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='musicapplication.artists'),
        ),
    ]
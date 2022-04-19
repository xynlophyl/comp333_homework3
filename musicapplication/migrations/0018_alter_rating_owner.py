# Generated by Django 4.0.2 on 2022-04-19 02:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('musicapplication', '0017_rating_owner_alter_rating_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rating',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ratings', to=settings.AUTH_USER_MODEL),
        ),
    ]

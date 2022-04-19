from django.db import models
from django.core.validators import MinValueValidator,MaxValueValidator 

from django.contrib.auth.models import User


# Create your models here.
class rating (models.Model):
    song_artist = models.CharField(max_length=255)
    song = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    rating = models.PositiveBigIntegerField(validators= [MinValueValidator(0), MaxValueValidator(5)], default=5)
    owner = models.ForeignKey(User, related_name="ratings", on_delete=models.CASCADE, null=True)

    def __str__(self):
       return f'{self.song} -> {self.rating}'


class song (models.Model) :
    #fields: song_artist, song, artist, genre
    GENRE = (('Pop','Pop'), ('Hip-Hop','Hip-Hop'), ('Classic','Classic'), ('Rock','Rock'), ('Country','Country'), ('Indie','Indie'),('EDM','EDM'), ('Jazz','Jazz'),('RnB','RnB'), ('Other','Other'))
    id = models.AutoField(primary_key=True)
    song_artist = models.CharField(max_length=255, unique= True)
    song = models.CharField(max_length=255)#, primary_key=True)
    artist = models.CharField(max_length=255)
    genre =  models.CharField(max_length=60,choices=GENRE)

    def __str__(self):
        return self.song_artist
    
    
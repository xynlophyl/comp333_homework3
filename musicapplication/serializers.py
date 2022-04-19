from rest_framework import serializers
from .models import rating, song
from django.db.models import Avg

# The serializer translates a Todo object into a format that
# can be stored in our database. We use the Todo model.


class ratingsSerializer(serializers.ModelSerializer):
  class Meta:
    model = rating
    fields = ('id','owner', 'song_artist', 'song', 'artist','rating')

class songsSerializer(serializers.ModelSerializer):
  rating_average = serializers.SerializerMethodField()

  class Meta:
    model = song
    # fields = ('song_artist','song','artist', 'genre', 'rating_average')
    fields = '__all__'

  def get_rating_average(self, data):
    return rating.objects.filter(song_artist=data.song_artist).aggregate(rating_average=Avg('rating')).get('rating_average')

    
from django.shortcuts import render

from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status

from .serializers import ratingsSerializer, songsSerializer
from .models import rating, song



# Create your views here.

class songsView(viewsets.ModelViewSet):
    serializer_class = songsSerializer
    queryset = song.objects.all() 

    def post(self, request, format=None):
        serializer = songsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status = status.HTTP_201_CREATED)
        #add http error response if not valid
    
    # def update(self, request, pk, format=None):
        

class ratingsView(viewsets.ModelViewSet):
    permissions_classes= [
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class = ratingsSerializer

    # queryset = rating.objects.all()


    def get_queryset(self):
        return self.request.user.ratings.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def post(self, request, format=None): 
        serializer = ratingsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # ratings = rating.objects.filter(song_artist=request.data.).values_list('rating', flat=True)
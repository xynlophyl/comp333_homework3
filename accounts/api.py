from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import userSerializer, registerSerializer, loginSerializer

class registrationAPI(generics.GenericAPIView):
    serializer_class = registerSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": userSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]       
        })

class loginAPI(generics.GenericAPIView):
    serializer_class = loginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": userSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]       
        })

class userAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    serializer_class = userSerializer

    def get_object(self):
        return self.request.user
        
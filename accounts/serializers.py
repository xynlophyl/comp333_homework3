from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'email')

class registerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username','email','password', )
        extra_kwargs= {'password':{'write_only': True}}
    
    def create(self,data):
        user = User.objects.create_user(data['username'], data['email'], data['password'])
        return user
    
class loginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self,data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("incorrect credentials")
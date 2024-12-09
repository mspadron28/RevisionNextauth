from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserPrivileges, UserInformation

class UserSerializer(serializers.ModelSerializer):
    #write_only=True: Significa que estos datos pueden enviarse al servidor, pero no se devolverán en las respuestas.
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    country = serializers.CharField(required=True, write_only=True)
    phone = serializers.CharField(required=False, write_only=True)
    password = serializers.CharField(write_only=True)

    def validate_country(self, value):
        allowed_countries = ["Argentina", "Bolivia", "Chile", "México", "Perú"]
        if value not in allowed_countries:
            raise serializers.ValidationError("Invalid country.")
        return value

    def create(self, validated_data):
        phone = validated_data.pop('phone', None)
        country = validated_data.pop('country', None)
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        UserPrivileges.objects.create(user=user, privs=0)
        UserInformation.objects.create(user=user, country=country, phone=phone)
        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'first_name', 'last_name', 'country', 'phone']

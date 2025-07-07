from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

#회원가입 시 사용
class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'phone', 'username', 'consent_location']
    
    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            phone=validated_data['phone'],
            username=validated_data.get('username', ''),
            consent_location=validated_data['consent_location'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


#마이페이지, 사용자 정보 조회 시 사용 
class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'phone', 'username', 'location_lat', 'location_lng', 'consent_location']

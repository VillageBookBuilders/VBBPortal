from rest_framework import serializers

from api.models import *


class LibrarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Library
        fields = "__all__"


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = "__all__"


class MyAppointmentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ("display","event_id")

class MentorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorProfile
        fields = "__all__"

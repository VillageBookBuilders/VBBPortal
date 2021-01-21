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


class SessionSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = SessionSlot
        fields = ("id", "mentor","display", "event_id", "mentor_notes", "hangouts_link")


class MentorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorProfile
        fields = "__all__"

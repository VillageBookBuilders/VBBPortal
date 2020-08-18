import datetime

from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from api import aux_fns


class Library(models.Model):
    name = models.CharField(max_length=40, null=True, blank=True)
    time_zone = models.CharField(max_length=40, null=True, blank=True)
    calendar_id = models.CharField(max_length=120, null=True)
    whatsapp_group = models.CharField(max_length=60, null=True)
    program_director_name = models.CharField(max_length=50, null=True, blank=True)
    program_director_phone = models.CharField(max_length=15, null=True, blank=True)
    program_director_email = models.EmailField(max_length=50, null=True, blank=True)
    library_gmail_group = models.CharField(max_length=50, null=True, blank=True)
    library_classroom = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        verbose_name_plural = "Libraries"

    def __str__(self):
        return self.name


class Language(models.Model):
    name = models.CharField(max_length=40, null=True, unique=True)

    def __str__(self):
        return self.name


class MentorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.SET_NULL, related_name="mp", null=True, blank=True)
    time_zone = models.CharField(max_length=40, null=True)
    first_name = models.CharField(max_length=60, null=True)
    last_name = models.CharField(max_length=60, null=True)
    personal_email = models.EmailField(max_length=60, null=True, unique=True)
    vbb_email = models.EmailField(max_length=60, null=True, unique=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    occupation = models.CharField(max_length=70, null=True, blank=True)
    affiliation = models.CharField(max_length=70, null=True, blank=True)
    referral_source = models.TextField(max_length=200, null=True, blank=True)
    desired_involvement = models.TextField(max_length=200, null=True, blank=True)
    initials = models.CharField(max_length=6, null=True)
    advisor_notes = models.TextField(max_length=256,null=True,blank=True)

    def __str__(self):
        return self.first_name + " " + self.last_name

class MenteeComputer(models.Model):
    library = models.ForeignKey(
        Library,
        on_delete=models.SET_NULL,
        related_name="computers",
        null=True,
        blank=True,
    )
    language = models.ForeignKey(
        Language,
        on_delete=models.SET_NULL,
        related_name="computers",
        null=True,
    )
    computer_number = models.IntegerField(null=True)
    computer_email = models.EmailField( max_length=70, null=True)
    room_id = models.CharField(max_length=100, null=True)

    def __str__(self):
        return (
            str(self.library)
            + " "
            + str(self.computer_number)
            + " ("
            + self.computer_email
            + ")"
        )


class SessionSlot(models.Model):
    mentor = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name="sessionslots",
        null=True,
        blank=True,
    )
    mentee_computer = models.ForeignKey(
        MenteeComputer,
        on_delete=models.SET_NULL,
        related_name="sessionslots",
        null=True,
    )
    language = models.ForeignKey(Language, on_delete=models.SET_NULL, null=True)
    msm = models.PositiveIntegerField(null=True, 
        validators=[MinValueValidator(0), MaxValueValidator(10079)])
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    event_id = models.CharField(max_length=60, null=True, blank=True)
    mentor_notes = models.TextField(max_length=500, null=True, blank=True)

    def __str__(self):
        return aux_fns.display_day(
            "US/Eastern",
            self.msm,
            self.end_date,
        )

    def display(self):
        return aux_fns.display_day(
            self.mentor.mp.time_zone,
            self.msm,
            self.end_date,
            True
        )

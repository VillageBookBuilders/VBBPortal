import datetime
from pytz import timezone

from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from api import aux_fns


class Library(models.Model):
    name = models.CharField(verbose_name="name", max_length=40, null=True, blank=True)
    time_zone = models.CharField(
        verbose_name="time zone", max_length=40, null=True, blank=True
    )
    calendar_id = models.CharField(
        verbose_name="calendar id", max_length=120, null=True, blank=True
    )
    calendar_name = models.CharField(
        verbose_name="library calendar", max_length=50, null=True, blank=True
    )
    whatsapp_group = models.CharField(
        verbose_name="whatsapp group", max_length=40, null=True, blank=True
    )
    program_director_name = models.CharField(
        verbose_name="program director name", max_length=50, null=True, blank=True
    )
    program_director_phone = models.CharField(
        verbose_name="program director phone", max_length=15, null=True, blank=True
    )
    program_director_email = models.EmailField(
        verbose_name="program director email", max_length=50, null=True, blank=True
    )
    library_gmail_group = models.CharField(
        verbose_name="library gmail group", max_length=50, null=True, blank=True
    )
    library_classroom = models.CharField(
        verbose_name="library classroom", max_length=50, null=True, blank=True
    )

    class Meta:
        verbose_name_plural = "Libraries"

    def __str__(self):
        return self.name


class Language(models.Model):
    name = models.CharField(verbose_name="name", max_length=40, null=True, blank=True)

    def __str__(self):
        return self.name


class MentorProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="mentor", null=True, blank=True
    )
    time_zone = models.CharField(
        verbose_name="time zone", max_length=40, null=True, blank=True
    )
    first_name = models.CharField(
        verbose_name="first name", max_length=60, null=True, blank=True
    )
    last_name = models.CharField(
        verbose_name="last name", max_length=60, null=True, blank=True
    )
    personal_email = models.EmailField(
        verbose_name="personal email", max_length=60, null=True, blank=True
    )
    vbb_email = models.EmailField(
        verbose_name="vbb email", max_length=60, null=True, blank=True
    )
    phone_number = models.CharField(
        verbose_name="phone number", max_length=12, null=True, blank=True
    )
    occupation = models.CharField(
        verbose_name="occupation", max_length=70, null=True, blank=True
    )
    organization = models.CharField(
        verbose_name="organization", max_length=70, null=True, blank=True
    )
    referral_source = models.TextField(
        verbose_name="referral source", max_length=200, null=True, blank=True
    )
    involvement = models.TextField(
        verbose_name="additional involvement", max_length=200, null=True, blank=True
    )

    def __str__(self):
        return self.user.first_name + " " + self.user.last_name


class MenteeProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="mentee")
    library = models.ForeignKey(
        Library, on_delete=models.SET_NULL, related_name="mentee", null=True, blank=True
    )
    time_zone = models.CharField(
        verbose_name="time zone", max_length=40, null=True, blank=True
    )

    def __str__(self):
        return self.user.first_name + " " + self.user.last_name


class Computer(models.Model):
    library = models.ForeignKey(
        Library,
        on_delete=models.SET_NULL,
        related_name="computer",
        null=True,
        blank=True,
    )
    language = models.ForeignKey(
        Language,
        on_delete=models.SET_NULL,
        related_name="computer",
        null=True,
        blank=True,
    )
    computer_num = models.IntegerField(
        verbose_name="computer number", null=True, blank=True
    )
    computer_email = models.EmailField(
        verbose_name="computer email", max_length=70, null=True, blank=True
    )
    room_id = models.CharField(
        verbose_name="room id", max_length=100, null=True, blank=True
    )

    def __str__(self):
        return (
            str(self.library)
            + " "
            + str(self.computer_num)
            + " ("
            + self.computer_email
            + ")"
        )


class Appointment(models.Model):
    mentor = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name="mentor_appointments",
        null=True,
        blank=True,
    )
    mentee = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name="mentee_appointments",
        null=True,
        blank=True,
    )
    mentee_computer = models.ForeignKey(
        Computer,
        on_delete=models.SET_NULL,
        related_name="computer_appointments",
        null=True,
        blank=True,
    )
    language = models.ForeignKey(
        Language,
        on_delete=models.SET_NULL,
        related_name="appointment",
        null=True,
        blank=True,
    )
    hsm = models.PositiveIntegerField(
        verbose_name="hours since monday at 12am (eastern time)",
        null=True,
        blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(167)],
    )
    start_date = models.DateField(verbose_name="start date", null=True, blank=True)
    end_date = models.DateField(verbose_name="end date", null=True, blank=True)
    event_id = models.CharField(
        verbose_name="event id", max_length=60, null=True, blank=True
    )
    notes = models.TextField(
        verbose_name="notes", max_length=500, null=True, blank=True
    )

    def __str__(self):

        if self.hsm is None:
            return "** Add time **"
        if self.end_date is None:
            return (
                aux_fns.hsm_to_day_name(self.hsm)
                + "s @ "
                + aux_fns.hsm_to_12hr(self.hsm)
            )
        return (
            aux_fns.hsm_to_day_name(self.hsm)
            + "s @ "
            + aux_fns.hsm_to_12hr(self.hsm)
            + " until "
            + str(self.end_date.strftime("%x"))
        )

    def display(self):
        today = datetime.datetime.now()
        tz2, tz1 = timezone("US/Eastern"), timezone(self.mentor.mentor.time_zone)
        diff = (
            tz1.localize(today) - tz2.localize(today).astimezone(tz1)
        ).seconds // 3600
        newhsm = (self.hsm - diff + 168) % 168
        tz1, tz2 = timezone("US/Eastern"), timezone(self.mentor.mentor.time_zone)
        diff = (
            tz1.localize(today) - tz2.localize(today).astimezone(tz1)
        ).seconds // 3600
        return (
            aux_fns.hsm_to_day_name(newhsm)
            + "s @ "
            + aux_fns.hsm_to_12hr(newhsm)
            + " until "
            + str(self.end_date.strftime("%x"))
        )

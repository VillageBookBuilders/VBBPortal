from datetime import datetime, timedelta
import random

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.db.models import Q
from django.shortcuts import render
from rest_auth.registration.views import SocialLoginView
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework import status

from api import aux_fns
from api.models import *
from api.serializers import *
from api.google_apis import *

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client


class LibraryListView(ListAPIView):
    queryset = Library.objects.all()
    serializer_class = LibrarySerializer
    permission_classes = (AllowAny,)


class LanguageListView(ListAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    permission_classes = (AllowAny,)


class AvailableAppointmentTimeList(ListAPIView):
    """
    Returns a list of available appointment times based on a mentor's preference (queries specific fields by primary key).
    URL example:  api/available/?library=1&language=1&min=1&max=24
    """

    queryset = Appointment.objects.all()
    permission_classes = (AllowAny,)

    def get(self, request):
        appts = Appointment.objects.all()
        library_params = self.request.query_params.get("library")
        language_params = self.request.query_params.get("language")
        min_hsm_params = int(self.request.query_params.get("min_hsm"))
        max_hsm_params = int(self.request.query_params.get("max_hsm"))

        # library and mentor filtering
        if library_params is None or library_params == "0":
            appts = (
                appts.filter(mentor=None, language=language_params,)
                .values("hsm")
                .distinct()
            )
        else:
            appts = (
                appts.filter(
                    mentor=None,
                    mentee_computer__library=library_params,
                    language=language_params,
                )
                .values("hsm")
                .distinct()
            )

        # hsm filtering
        if min_hsm_params < 0:
            appts = appts.filter(
                Q(hsm__lt=max_hsm_params) | Q(hsm__gte=168 + min_hsm_params)
            )
        elif max_hsm_params >= 168:
            appts = appts.filter(
                Q(hsm__lt=max_hsm_params - 168) | Q(hsm__gte=min_hsm_params)
            )
        else:
            appts = appts.filter(hsm__gte=min_hsm_params, hsm__lte=max_hsm_params)

        return Response(appts)

@api_view(["POST"])
def first_time_signup(request):
    """
    When a user signs up, create a mentor profile. If they are new mentors, create a vbb email and send a
    welcome email.
    """
    print('request.data', request.data)
    gapi = google_apis()
    if request.data["vbb_email"] == None or request.data["vbb_email"] == '':
        request.data["vbb_email"], pwd = gapi.account_create(request.data["first_name"], request.data["last_name"], request.data["personal_email"])
        print('new vbb email: ', request.data["vbb_email"])
        print('password: ', pwd)
        #gapi.email_send(request.data["personal_email"], "Welcome to VBB", "api\emails\\test\\test-template.html", "api\emails\\test\\test.html", {'__first_name': request.data["first_name"]})
    serializer = MentorProfileSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def check_signin(request):
    """
    When a user logs in, check if they have a mentor profile before allowing them to proceed
    """
    if "villagementors.org" not in request.user.email and "villagebookbuilders.org" not in request.user.email:
        return Response(
            {
                "success": "false",
                "message": "Sorry, you need to use a villagementors.org Gsuite account to log in to this website. If you do not have a village mentors account, please sign up for one using the register link above.",
            }
        )
    mps = MentorProfile.objects.filter(vbb_email=request.user.email)
    if mps is None or len(mps) <1:
        return Response(
            {
                "success": "false",
                "message": "Sorry, there is no signin data associated with this account. Please sign up to be a mentor using the register link above or contact our mentor advisors at mentor@villagebookbuilders.org for assistance.",
            }
        )
    if len(mps) > 1:
        return Response(
            {
                "success": "false",
                "message": "Sorry, there appears to be multiple mentors associated with this account. Please contact our mentor advisors at mentor@villagebookbuilders.org for assistance.",
            }
        )
    if mps[0].user is None:
        mps[0].user = request.user
        mps[0].save()
    return Response(
        {
            "success": "true",
            "message": ("Welcome, "+request.user.username +"!"),
        }
    )

@api_view(["POST"])
def book_appointment(request):
    """
    Gets an appointment list at a given time based on preferences then randomly picks one appointment and populates it with the mentor's name (queries specific fields by primary key).
    URL example:  api/booking/?library=1&language=1&hsm=1
    """
    appts = Appointment.objects.all()
    library_params = request.query_params.get("library")
    language_params = request.query_params.get("language")
    hsm_params = request.query_params.get("hsm")

    if library_params is None or library_params == "0":
        appts = appts.filter(mentor=None, language=language_params, hsm=hsm_params,)
    else:
        appts = appts.filter(
            mentor=None,
            mentee_computer__library=library_params,
            language=language_params,
            hsm=hsm_params,
        )
    # Check if there are no appointments that match the request.
    if not appts:
        return Response(
            {
                "success": "false",
                "message": "No available appointments exist with those specifications.",
            }
        )
    myappt = random.choice(appts)
    print("apt", myappt)
    myappt.mentor = request.user
    myappt.start_date = datetime.today() + timedelta(
        days=(aux_fns.diff_today_dsm(myappt.hsm) + 7)
    )
    myappt.end_date = myappt.start_date + timedelta(weeks=17)
    gapi = google_apis()
    start_time = aux_fns.date_combine_time(str(myappt.start_date), myappt.hsm)
    event_id = gapi.calendar_event(myappt.mentee_computer.computer_email, myappt.mentor.mentor.vbb_email, myappt.mentor.mentor.personal_email, start_time, myappt.mentee_computer.library.calendar_id)
    myappt.event_id = event_id
    myappt.save()
    # FIXME - Add try/except/finally blocks for error checking (not logged in, appointment got taken before they refreshed)
    return Response(
        {"success": "true", "user": str(myappt.mentor), "appointment": str(myappt),}
    )

@api_view(["POST"])
def generate_appointments(request):
    """
    Generates appointments from opentime to closetime on days from startday to endday
    URL example:  api/generate/?computer=3&language=1&startday=0&endday=4&opentime=5&closetime=6
    """
    computer_params = request.query_params.get("computer")
    language_params = request.query_params.get("language")
    startday_params = int(request.query_params.get("startday"))
    endday_params = int(request.query_params.get("endday"))
    opentime_params = int(request.query_params.get("opentime"))
    closetime_params = int(request.query_params.get("closetime"))
    
    computer = Computer.objects.get(pk=computer_params)
    if language_params is None:
        lang = computer.language
    else:
        lang = Language.objects.get(pk=language_params)
    for i in range(opentime_params, closetime_params):
        for j in range(startday_params, endday_params+1):
            apt = Appointment()
            apt.mentee_computer = computer
            apt.language = lang
            apt.hsm = i + (j*24)
            apt.save()

    return Response(
        {"success": "true"}
    )
            

class MyAppointmentListView(ListAPIView):
    """
    Returns a list of the mentor's booked appointments.
    """

    permission_classes = (IsAuthenticated,)
    serializer_class = MyAppointmentListSerializer

    def get_queryset(self):
        return self.request.user.mentor_appointments.all()

@api_view(["GET"])
def testing(request):
    # create user acct 
    
    test_mentor_prof = MentorProfile.objects.get(user=4)
    gapi = google_apis()
    # res = gapi.account_create(test_mentor_prof.user.first_name, test_mentor_prof.user.last_name, test_mentor_prof.personal_email)
    # test_mentor_prof.vbb_email = res
    # test_mentor_prof.save()
    
    # sending an email: 
    # email_res = gapi.email_send(test_mentor_prof.vbb_email, 'hey', 'heytext')


    
    return Response(
            {"success": "true", 
            # "email": res, 
            "first_name": str(test_mentor_prof.user),
            "email": test_mentor_prof.vbb_email
            }


        )


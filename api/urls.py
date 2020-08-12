from django.urls import path
from .views import *

urlpatterns = [
    path("signup/", first_time_signup),
    path("googlelogin/", GoogleLogin.as_view()),
    path("checksignin/", check_signin),
    path("generate/", generate_sessionslots),
    path("library/", LibraryListView.as_view()),
    path("language/", LanguageListView.as_view()),
    path("available/", AvailableSessionSlotList.as_view()),
    path("mysessionslots/", MySessionSlotListView.as_view()),
    path("book/", book_sessionslot),
]
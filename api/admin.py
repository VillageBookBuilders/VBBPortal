from django.contrib import admin

from api.models import *

admin.site.site_header = "Admin - VBB Portal"
admin.site.site_title = "VBB Portal"


class LibraryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "time_zone",
        "calendar_id",
        "whatsapp_group",
        "program_director_name",
        "program_director_phone",
        "program_director_email",
        "announcements_group",
        "collaboration_group",
    )
    readonly_fields = ("id",)
    search_fields = (
        "id",
        "name",
        "time_zone",
        "calendar_id",
        "whatsapp_group",
        "program_director_name",
        "program_director_phone",
        "program_director_email",
        "announcements_group",
        "collaboration_group",
    )


class LanguageAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    readonly_fields = ("id",)
    search_fields = ("id", "name")


class MentorProfileAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "__str__",
        "user",
        "time_zone",
        "personal_email",
        "vbb_email",
        "phone",
        "languages",
        "adult",
        "occupation",
        "vbb_chapter",
        "affiliation",
        "referral_source",
        "charged",
        "desired_involvement",
        "city",
        "initials",
        "advisor_notes",
    )
    readonly_fields = ("id",)
    search_fields = (
        "id",
        "__str__",
        "user",
        "time_zone",
        "personal_email",
        "vbb_email",
        "phone",
        "languages",
        "adult",
        "occupation",
        "vbb_chapter",
        "affiliation",
        "referral_source",
        "charged",
        "desired_involvement",
        "city",
        "initials",
        "advisor_notes",
    )

class MenteeComputerAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "__str__",
        "library",
        "language",
        "computer_number",
        "computer_email",
        "room_id",
    )
    readonly_fields = ("id",)
    search_fields = (
        "id",
        "library",
        "language",
        "computer_number",
        "computer_email",
        "room_id",
    )


class SessionSlotAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "__str__",
        "mentor",
        "mentee_computer",
        "language",
        "msm",
        "start_date",
        "end_date",
        "event_id",
        "mentor_notes",
    )
    readonly_fields = ("id",)
    search_fields = (
        "id",
        "mentor",
        "mentee_computer",
        "language",
        "msm",
        "start_date",
        "end_date",
        "event_id",
    )


admin.site.register(Library, LibraryAdmin)
admin.site.register(Language, LanguageAdmin)
admin.site.register(MentorProfile, MentorProfileAdmin)
admin.site.register(MenteeComputer, MenteeComputerAdmin)
admin.site.register(SessionSlot, SessionSlotAdmin)

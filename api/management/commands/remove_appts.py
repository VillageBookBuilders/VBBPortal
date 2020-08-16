import datetime

from django.core.management.base import BaseCommand

from api.models import SessionSlot


class Command(BaseCommand):
    help = "Unbooks session slots that have expired"

    def handle(self, *args, **options):
        booked_appts = SessionSlot.objects.exclude(mentor=None)
        num_expired_appts = booked_appts.filter(
            end_date__lt=datetime.datetime.today()
        ).count()

        if num_expired_appts > 0:
            #FIXME send them an email notifying them
            SessionSlot.objects.filter(end_date__lt=datetime.datetime.today()).update(
                mentor=None
            )
            return str(num_expired_appts) + " expired sessionslot(s) unbooked."
        else:
            return "No sessions have expired."

#FIXME add a weeks warning
#FIXME add a command for checking all session slots against their corresponding google event 
# and make sure the google event is extended appropriately
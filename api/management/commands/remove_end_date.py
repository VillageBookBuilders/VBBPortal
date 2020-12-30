import datetime

from django.core.management.base import BaseCommand

from api.models import SessionSlot
from api.google_apis import *


class Command(BaseCommand):
    help = "removes end date from recurrence rule on the google calendar"

    def handle(self, *args, **options):
        """
        Shifts all session slots to be encoded in UTC instead of EST
        """
        def _writelog(logstr):
            with open("log_remove_end.txt",'a') as writefile:
                writefile.write(logstr + '\n')
        try:
            gapi = google_apis()
            allslots = SessionSlot.objects.all()
            for slot in allslots:
                try:
                    if slot.mentor and slot.event_id:
                        try:
                            gapi.remove_end_date(slot.mentee_computer.library.calendar_id,slot.event_id)
                            _writelog("Successfully updated google event for {}".format(slot.id))
                        except Exception as e:
                            _writelog("{} Failed to update google event for {}".format(str(e),slot.id))
                    else:
                        _writelog("No google event for slot {}".format(slot.id))
                except:
                    _writelog("Failed to add {}".format(slot.id))
        except Exception as e:
            return str(e)
        return "true"
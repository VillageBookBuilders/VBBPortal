import datetime

from django.core.management.base import BaseCommand

from api.models import SessionSlot



class Command(BaseCommand):
    help = "Shifts session slots to export csv +240"

    def handle(self, *args, **options):
        """
        reverts msm times to the values in the export csv
        """
        def _writelog(logstr):
            with open("log2.txt",'a') as writefile:
                writefile.write(logstr + '\n')

        with open("export.csv", "r") as infile:
            lines = infile.readlines()
            for line in lines[1:5]:
                splitline = line.split(",")
                _writelog(str(splitline))
                id = splitline[0]
                msm = splitline[-3]
                _writelog(str(id) + " " + str(int(msm)+240))
                slot = SessionSlot.objects.get(pk=28)
                slot.msm = int(msm)+240
                slot.save()


# Generated by Django 3.0.8 on 2021-05-18 18:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0030_auto_20210420_1601'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mentorprofile',
            name='isVerified_notes',
        ),
    ]

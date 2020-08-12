import datetime
from pytz import timezone

def diff_today_dsm(msm):
    """Calculates the difference in the number of days between today and the selected day of the week.
    Takes: int
    Returns: int"""
    selected_dsm = (msm//60)//24
    today_dsm = datetime.datetime.today().weekday()
    day_diff = selected_dsm - today_dsm
    if day_diff < 0:
        day_diff = day_diff + 7
    return day_diff


def msm_to_day_name(msm):
    """Converts hours since Monday to the name of its day of the week.
    Takes: int
    Returns: string"""
    days_of_week = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ]
    day = (msm//60) // 24
    return days_of_week[day]


def msm_to_12hr(msm):
    """Converts hours since Monday to an am/pm time.
    Takes: int
    Returns: string"""
    minutes = (msm % 60)
    if minutes == 0:
        minutes = ""  
    elif minutes<10 :
        minutes = (":0"+ str(minutes))
    else: 
        minutes = (":"+ str(minutes))
    am_pm_time = (msm//60) % 24
    if am_pm_time > 12:
        am_pm_time = am_pm_time - 12
        return str(am_pm_time)+minutes+"pm"
    elif am_pm_time == 12:
        return "12"+minutes+"pm"
    elif am_pm_time == 0:
        return "12"+minutes+"am"
    return str(am_pm_time)+minutes+"am"

def date_combine_time(start_date, msm, sec="00"):
    """Converts start_date format to timestamp 
    with date, hours, min, sec
    input start_date in "2020-07-31" format
    output  "2020-07-30T23:00:00" """
    # hours since day has started
    start_date = str(start_date)[:10] # get first 10 characters
    minutes = str(msm % 60)
    if (msm % 60) == 0:
        minutes = "00"  
    elif (msm % 60) <10 :
        minutes = ("0"+ str(minutes))
    day_hrs = (msm//60) % 24
    # convert day hours to 2 length string ie. 07
    str_hrs = str(day_hrs)
    if day_hrs < 10: # adding a 0 to beginning 
        str_hrs = "0" + str_hrs
    # concatenate date with time 
    result = start_date + "T" + str_hrs + ":" + minutes + ":" + sec
    return result

def display_day(tzname, msm, end_date=None, show_tz=False):
    if msm is None:
        return "msm is None"
    today = datetime.datetime.now()
    tz1, tz2= timezone("US/Eastern"), timezone(tzname)
    delta = (tz2.localize(today) - tz1.localize(today).astimezone(tz2))
    diff = 1440*delta.days + round(delta.seconds / 60)
    newmsm = int((msm - diff + 10080) % 10080)
    tz_disp = " (" + tzname + " time)" if show_tz else ""
    if end_date is None:
        return (
            msm_to_day_name(newmsm)
            + "s @ "
            + msm_to_12hr(newmsm)
            + tz_disp
        )
    return (
        msm_to_day_name(newmsm)
        + "s @ "
        + msm_to_12hr(newmsm)
        + tz_disp
        + " until "
        + str(end_date.strftime("%x"))
    )

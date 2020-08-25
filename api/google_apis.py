
import os
from oauth2client import file, client
from google.oauth2 import service_account
from googleapiclient import discovery
from googleapiclient.discovery import build
from datetime import datetime, timedelta
from googleapiclient import _auth
from apiclient import errors
import base64
import requests
import requests_oauth2
from requests_oauth2 import OAuth2BearerToken

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from bs4 import BeautifulSoup
import re
import random
# from dateutil.relativedelta import relativedelta
class google_apis:
  ''''
  FUNCTIONS:
  1) account_create(self, firstName, lastName, personalEmail)
    - creates a mentor account 
  2) calendar_event(self, menteeEmail, mentorEmail, personalEmail, directorEmail, start_time, end_date, calendar_id, room, duration=.5)
    - creates a calendar event with a google meets link 
  3) email_send(self, to, subject, templatePath, extraData=None, cc=None)
    - sends welcome email
  '''
  __webdev_cred=''
  __mentor_cred=''
  def __init__(self):
    #the proper scopes are needed to access specific Google APIs
    #see https://developers.google.com/identity/protocols/oauth2/scopes 
    scopes = [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/gmail.compose', 
      'https://www.googleapis.com/auth/admin.directory.user',
      'https://www.googleapis.com/auth/admin.directory.group',
    ]
    SERVICE_ACCOUNT_FILE = os.path.join("api","service-account.json")
    credentials = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE, scopes=scopes)
    self.__webdev_cred = credentials.with_subject('webdevelopment@villagebookbuilders.org')
    self.__mentor_cred = credentials.with_subject('mentor@villagebookbuilders.org')

  def account_create(self, firstName, lastName, personalEmail):
    http = _auth.authorized_http(self.__webdev_cred)
    self.__webdev_cred.refresh(http._request)
    url = "https://www.googleapis.com/admin/directory/v1/users"
    headers = {
      #'Authorization': 'Bearer' delegated_credentials.token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    # checking if the email id already exists, adds an id to the end to differentiate
    addedID = 0 #on repeat, email will start from firstname.lastname1@villagementors.org
    def userExists(email):
      url = 'https://www.googleapis.com/admin/directory/v1/users/' + email
      with requests.Session() as s:
        s.auth = OAuth2BearerToken(self.__webdev_cred.token)
        r = s.get(url)
        if (r.status_code == 404):
          return False
        return True

    primaryEmail = firstName + '.' + lastName + '@villagementors.org'
    
    while(userExists(primaryEmail)):
      addedID+=1
      primaryEmail = firstName + '.' + lastName + str(addedID) + '@villagementors.org'
    pwd = 'VBB' + str(random.randint(100000000, 1000000000)) + random.choice(['!','@','#','$','%','&'])

    data = ''' 
    {
      "primaryEmail": "%s",
      "name": {
        "familyName": "%s",
        "givenName": "%s"
      },
      "password": "%s",
      "changePasswordAtNextLogin": "true",
      "recoveryEmail": "%s",
    }
    '''% (primaryEmail, lastName, firstName, pwd, personalEmail)

    with requests.Session() as s:
      s.auth = OAuth2BearerToken(self.__webdev_cred.token)
      r = s.post(url, headers=headers, data=data)
    return (primaryEmail, pwd)


  def calendar_event(self, mentorFirstName, menteeEmail, mentorEmail, personalEmail, directorEmail, start_time, end_date, calendar_id, room, duration=.5):
    calendar_service = build('calendar', 'v3', credentials=self.__mentor_cred)
    timezone = 'America/New_York'
    start_date_time_obj = datetime.strptime(start_time, '%Y-%m-%dT%H:%M:%S')
    end_time = start_date_time_obj + timedelta(hours=duration)
    end_date_formated = end_date.replace(':', '')
    end_date_formated = end_date_formated.replace('-', '')
    end_date_formated += 'Z'

    event = {
      'summary': mentorFirstName + ' - VBB Mentoring Session',
      'start': {
        'dateTime': start_date_time_obj.strftime("%Y-%m-%dT%H:%M:%S"),
        'timeZone': timezone,
      },
      'end': {
        'dateTime': end_time.strftime("%Y-%m-%dT%H:%M:%S"),
        'timeZone': timezone,
      },
      'recurrence': [
        'RRULE:FREQ=WEEKLY;UNTIL=' + end_date_formated
      ],
      'attendees': [
        {'email': menteeEmail},
        {'email': mentorEmail},
        {'email': personalEmail},
        {'email': directorEmail},
        {'email': room, 'resource': "true"}
      ],
      'reminders': {
        'useDefault': False,
        'overrides': [
        {'method': 'email', 'minutes': 24 * 60}, # reminder 24 hrs before event
        {'method': 'popup', 'minutes': 10}, # pop up reminder, 10 min before event
        ],
      },
    }
    event_obj = calendar_service.events().insert(calendarId=calendar_id, body=event).execute()
    return(event_obj['id']) 

  def email_send(self, to, subject, templatePath, extraData=None, cc=None):
    """
    to: recipient
    cc: python array, carbon copy recipients
    """
    http = _auth.authorized_http(self.__mentor_cred)
    email_service = build('gmail', 'v1', http=http)
    personalizedPath = os.path.join("api", "emails", "templates", "placeholder.html")
    if cc is not None:
      cc = ','.join(cc)
    def updatePersonalizedHTML(templatePath, personalizedPath, extraData):
      """ Get HTML with the extraData filled in where specified. 
      - Use Beautiful soup to find and replace the placeholder values with the proper user
        specific info 
      - use 'with' to write the beautifulSoup string into a newFile - the personalized version of the 
        original templatePath. This personalized version will be sent out in the email and will be 
        rewritten everytime the function is called.
      """
      with open(templatePath, 'r', encoding="utf8") as f:
        template = f.read()
      soup = BeautifulSoup(template, features="html.parser")
      if extraData != None:
        for key in extraData:
          target = soup.find_all(text=re.compile(r'%s'%key))
          for v in target:
            v.replace_with(v.replace('%s'%key, extraData[key]))
        # now soup string has the proper values
      with open(personalizedPath, "w") as file:
        file.write(str(soup))

    def create_message(to, subject, personalizedPath, cc=None):
      """Create a message for an email.

      Args:
        sender: Email address of the sender.
        to: Email address of the receiver.
        subject: The subject of the email message.
        personalizedPath: File path to email in html file with variable replaced
                  with proper values.

      Returns:
        An object containing a base64url encoded email object.
      """
      f = open(personalizedPath, 'r')
      message_text = f.read() 
      sender = self.__mentor_cred._subject
      message = MIMEText(message_text, 'html')
      message['to'] = to
      message['cc'] = cc
      message['from'] = sender
      message['subject'] = subject
      message_as_bytes = message.as_bytes() # the message should converted from string to bytes.
      message_as_base64 = base64.urlsafe_b64encode(message_as_bytes) #encode in base64 (printable letters coding)
      raw = message_as_base64.decode()  # need to JSON serializable
      return {'raw': raw} 

    def send_message(service, user_id, message):
      """Send an email message.

      Args:
        service: Authorized Gmail API service instance.
        user_id: User's email address. The special value "me"
        can be used to indicate the authenticated user.
        message: Message to be sent.

      Returns:
        Sent Message.
      """
      try:
        message = (email_service.users().messages().send(userId=user_id, body=message)
                  .execute())
        # print('Message Id: %s' % message['id'])
        return message
      except errors.HttpError as error:
        print('An error occurred: %s' % error)
    updatePersonalizedHTML(templatePath, personalizedPath, extraData)
    msg = create_message(to, subject, personalizedPath, cc)
    send_message(email_service, "me", msg)

  
  def group_subscribe(self, groupEmail, userEmail):
    http = _auth.authorized_http(self.__webdev_cred)
    self.__webdev_cred.refresh(http._request)
    url = "https://www.googleapis.com/admin/directory/v1/groups/" + groupEmail + "/members"
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    data = ''' 
    {
      "email": "%s",
      "role": "MEMBER",
    }
    '''% (userEmail)
    with requests.Session() as s:
      s.auth = OAuth2BearerToken(self.__webdev_cred.token)
      r = s.post(url, headers=headers, data=data)
      # print(r.text)

  def classroom_invite(self, courseID, email, role="TEACHER"):
    cred = self.__mentor_cred
    http = _auth.authorized_http(cred)
    cred.refresh(http._request)
    url = "https://classroom.googleapis.com/v1/invitations"
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    data = ''' 
    {
      "userId": "%s",
      "courseId": "%s",
      "role": "%s",
    }
    '''% (email, courseID, role)
    with requests.Session() as s:
      s.auth = OAuth2BearerToken(cred.token)
      r = s.post(url, headers=headers, data=data)

  def course_list(self, teacherEmail):
    cred = self.__mentor_cred
    http = _auth.authorized_http(cred)
    cred.refresh(http._request)
    url = "https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE&teacherId="+teacherEmail
    headers = {
      'Accept': 'application/json',
    }
    with requests.Session() as s:
      s.auth = OAuth2BearerToken(cred.token)
      r = s.get(url, headers=headers)
      return r.text


    
    
# # FOR TESTING PURPOSES -- REMOVE LATER
# def testFunction():
#   g = google_apis()
#   print("subscribing")
#   g.group_subscribe("mentor.collaboration@villagebookbuilders.org", "ed.ringger@villagementors.org")
#   welcome_mail = os.path.join("api", "emails", "templates", "welcomeLetter.html")
  
#   sessionConfirm_mail = os.path.join("api","emails","templates", "sessionConfirm.html")
#   training_mail = os.path.join("api","emails","templates", "training.html")
#   newMentorNotice_mail = os.path.join("api","emails","templates", "newMentorNotice.html")

  # g.email_send(
  #  "edringger@gmail.com",        # personal email form form
  #  "Welcome to the VBB Family!",                
  #  welcome_mail,
  #  {
  #    '__first_name': "Shwetha",                 # first name from form
  #    '__new_email': "varunvraja@gmail.com",         # email generated by shweta's code
  #    '__password': "vbb"                        # password generated by shweta's code
  #  },
  #  ["ed.test1@villagebookbuilders.org", "ed.ringger0@villagementors.org"]
  # )

  # g.email_send(
  #   "ed.test1@villagebookbuilders.org",        # personal email form form
  #   "Training",                
  #   training_mail,
  #   cc=["edringger@gmail.com"]
  # )

  # g.calendar_event(
  #   "TestShwetha",
  #   "sohan.kalva.test2@villagementors.org", 
  #   "shwetha.test1@villagebookbuilders.org",
  #   "shwetha.shinju@gmail.com", 
  #   "shwetha.shinju2@gmail.com",
  #   "2020-08-12T23:30:00", "2020-09-10T22:00:00", 
  #   "c_oha2uv7abp2vs6jlrl96aeoje8@group.calendar.google.com", 
  #   "c_188apa1pg08nkg9pn621lmhbfc0f04gnepkmor31ctim4rrfddh7aqbcchin4spedtp6e@resource.calendar.google.com")
  
# testFunction()

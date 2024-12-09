from django.db import models
from django.contrib.auth.models import User
from django.contrib.sessions.models import Session
from django.contrib.postgres.fields import ArrayField

class InvalidSessions(models.Model):
    session = models.OneToOneField(Session, models.DO_NOTHING)
    user = models.ForeignKey(User, models.DO_NOTHING)

    class Meta:
        db_table = 'invalid_sessions'


class UserInformation(models.Model):
    #Relacion con la tabla auth_user con su id
    user = models.OneToOneField(User, models.DO_NOTHING, primary_key=True, related_name='info')
    stand_id = models.IntegerField(blank=True, null=True)
    country = models.TextField(blank=True, null=True)
    sessions = models.IntegerField(blank=True, null=True)
    enabled_countries = ArrayField(models.CharField(max_length=255), blank=True, null=True)
    expiration_date = models.DateField(blank=True, null=True)
    phone = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'user_information'


class UserPrivileges(models.Model):
    user = models.OneToOneField(User, models.DO_NOTHING, primary_key=True, related_name='privs')
    privs = models.IntegerField()

    class Meta:
        db_table = 'user_privileges'


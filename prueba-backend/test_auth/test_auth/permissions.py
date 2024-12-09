from datetime import date
#Extiende de BasePermission de Django Rest Framework. 
#Esto le permite definir una lógica de autorización personalizada para las vistas en las que se quiera usar. 
from rest_framework.permissions import BasePermission 
from rest_framework.exceptions import PermissionDenied, AuthenticationFailed
from django.contrib.auth.models import User


class IsNotUnsubscribedOrExpiredUser(BasePermission):

    def has_permission(self, request, view):
        try:
            user = request.user
            if user.privs.privs != 2:
                if user.privs.privs == 0:
                    raise PermissionDenied('User is not subscribed')
                if date.today() > user.info.expiration_date:
                    raise PermissionDenied('User has expired')
            return True
        except User.privs.RelatedObjectDoesNotExist:
            raise AuthenticationFailed('User privileges not found')


class IsAdmin(BasePermission):

    def has_permission(self, request, view):
        user_privs = request.user.privs.privs
        if user_privs == 2:
            return True
        else:
            raise PermissionDenied('Permission denied')

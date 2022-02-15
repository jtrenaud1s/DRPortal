from django.urls import include, path
from .views import UserRegistration
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = "Authentication"

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", UserRegistration.as_view(), name="register"),
]

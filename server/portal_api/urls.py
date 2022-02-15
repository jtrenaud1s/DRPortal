from django.urls import include, path

from portal_api.views import CommitteeViewSet, TaskViewSet, UserViewSet
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view


app_name = "portal_api"

router = DefaultRouter()
router.register("tasks", TaskViewSet, basename="tasks")
router.register("users", UserViewSet, basename="users")
router.register("committees", CommitteeViewSet, basename="committees")

urlpatterns = [
    path(
        "",
        get_schema_view(
            title="Theta Xi Portal",
            description="API to access Theta Xi Portal Data",
            version="1.0.0",
        ),
        name="api-schema",
    ),
    path("", include(router.urls)),
    path("auth/", include("portal_auth.urls", namespace="portal_auth")),
]

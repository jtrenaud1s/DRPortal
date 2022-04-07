from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from portal.models import Committee, Task
from portal_api.permissions import IsCommitteeHead, IsTaskCommitteHeadOrMemberOrAdmin
from portal_auth.models import User
from portal_auth.permissions import IsSelf
from portal_auth.serializers import UserSerializer
from .serializers import CommitteeSerializer, TaskSerializer
from django_filters import rest_framework as filters



class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('assignees', 'committee')

    def get_permissions(self):
        permission_classes = []
        if self.action == "list" or self.action == "retrieve":
            permission_classes = [IsAuthenticated]
        elif (
            self.action == "create"
            or self.action == "update"
            or self.action == "partial_update"
            or self.action == "destroy"
        ):
            permission_classes = [IsTaskCommitteHeadOrMemberOrAdmin]

        return [permission() for permission in permission_classes]


class CommitteeViewSet(ModelViewSet):
    queryset = Committee.objects.all()
    serializer_class = CommitteeSerializer

    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('head', 'members')

    def get_permissions(self):
        permission_classes = []
        if self.action == "list" or self.action == "retrieve":
            permission_classes = [IsAuthenticated]
        elif self.action == "create" or self.action == "destroy":
            permission_classes = [IsAdminUser]
        elif self.action == "update" or self.action == "partial_update":
            permission_classes = [IsCommitteeHead]

        return [permission() for permission in permission_classes]


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == "list" or self.action == "retrieve":
            permission_classes = [IsAuthenticated]
        elif self.action == "create" or self.action == "destroy":
            permission_classes = [IsAdminUser]
        elif self.action == "update" or self.action == "partial_update":
            permission_classes = [IsSelf]

        return [permission() for permission in permission_classes]

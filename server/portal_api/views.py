from django.shortcuts import render
from rest_framework import generics
from portal.models import Task
from .serializers import TaskSerializer
from rest_framework.permissions import BasePermission, IsAdminUser, DjangoModelPermissionsOrAnonReadOnly, SAFE_METHODS
from django.contrib.auth.models import User

class IsCommitteeHeadOrMember(BasePermission):
    message = 'Editing tasks is restricted to those within the committee'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        committee = obj.committee
        committee_members = committee.members.all()

        return (request.user in committee_members) or (request.user == committee.head)

class TaskList(generics.ListCreateAPIView, IsCommitteeHeadOrMember):
    permission_classes = [IsCommitteeHeadOrMember]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    

class TaskDetail(generics.RetrieveUpdateDestroyAPIView, IsCommitteeHeadOrMember):
    permission_classes = [IsCommitteeHeadOrMember]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    
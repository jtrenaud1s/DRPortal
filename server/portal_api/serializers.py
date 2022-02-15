from rest_framework import serializers
from portal_auth.serializers import UserSerializer
from portal.models import Committee, Task


class CommitteeSerializer(serializers.ModelSerializer):

    def to_representation(self, instance: Committee):
        response = super().to_representation(instance)
        response['head'] = UserSerializer(instance.head).data
        response['members'] = UserSerializer(instance.members, many=True).data
        return response

    class Meta:
        model = Committee
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):

    def to_representation(self, instance: Task):
        response = super().to_representation(instance)
        response['creator'] = UserSerializer(instance.creator).data
        response['committee'] = CommitteeSerializer(instance.committee).data
        response['assignees'] = UserSerializer(
            instance.assignees, many=True).data
        return response

    class Meta:
        model = Task
        fields = '__all__'

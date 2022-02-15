from django.db import models
from portal_auth.models import User


class Committee(models.Model):
    name = models.CharField(max_length=255)
    head = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="committee_head", null=True, blank=True)
    members = models.ManyToManyField(User, related_name="committee_members", blank=True)

    def __str__(self):
        return self.name


class Task(models.Model):
    committee = models.ForeignKey(
        Committee, on_delete=models.PROTECT, null=True, blank=True)
    name = models.CharField(max_length=255)
    description = models.TextField(null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="task_creator")
    assignees = models.ManyToManyField(User, related_name="task_assignees", blank=True)

    class Meta:
        ordering = ['-created', '-updated']

    def __str__(self):
        return self.name

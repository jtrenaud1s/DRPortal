from django.db import models
from portal_auth.models import User


class Committee(models.Model):
    name = models.CharField(max_length=255)
    head = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, related_name="head_committee", null=True, blank=True)
    members = models.ManyToManyField(User, related_name="committee", blank=True)

    def __str__(self):
        return self.name


class Task(models.Model):
    class TaskStatus(models.IntegerChoices):
        IDEA = 1, "Idea"
        OPEN = 2, "Open"
        TODO = 3,  "To Do"
        IN_PROGRESS = 4, "In Progress",
        REVIEW = 5, "Review",
        COMPLETED = 6, "Completed"
    
    class TaskPriority(models.IntegerChoices):
        LOW_PRIORITY = 1, "Low Priority"
        NORMAL_PRIORITY = 2, "Normal Priority"
        HIGH_PRIORITY = 3, "High Priority"

    committee = models.ForeignKey(
        Committee, on_delete=models.CASCADE, related_name="task", null=True, blank=True)
    name = models.CharField(max_length=255)
    description = models.TextField(null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, related_name="owned_task")
    assignees = models.ManyToManyField(User, related_name="assigned_task", blank=True)
    due_date = models.DateTimeField(blank=True, null=True)
    status = models.PositiveSmallIntegerField(choices=TaskStatus.choices, default=TaskStatus.OPEN)
    priority = models.PositiveSmallIntegerField(choices=TaskPriority.choices, default=TaskPriority.NORMAL_PRIORITY)

    class Meta:
        ordering = ['-created', '-updated']

    def __str__(self):
        return self.name

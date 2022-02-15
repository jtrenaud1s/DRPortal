from django.contrib import admin
from .models import Task, Committee


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'creator', 'committee']

@admin.register(Committee)
class CommitteeAdmin(admin.ModelAdmin):
    list_display = ['name',  'head']

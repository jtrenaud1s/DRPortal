from unicodedata import name
from django.test import TestCase

from .models import User, Task, Committee

class Test_Create_Task(TestCase):

    @classmethod
    def setUpTestData(cls) -> None:
        test_user_1 = User.objects.create(username="test_user_1", password="1234567890")
        test_committee = Committee.objects.create(name="Test Committee", head=test_user_1)

        test_task = Task.objects.create(name="Test Task 1", creator=test_user_1, committee=test_committee, description="Test task")

    def test_task_content(self):
        task = Task.objects.get(id=1)
        committee = Committee.objects.get(id=1)

        name = f"{task.name}"
        description = f"{task.description}"
        creator = f"{task.creator}"

        self.assertEqual(creator, "test_user_1")
        self.assertEqual(name, "Test Task 1")
        self.assertEqual(description, "Test task")
        self.assertEqual(str(task), "Test Task 1")
        self.assertEqual(str(committee), "Test Committee")

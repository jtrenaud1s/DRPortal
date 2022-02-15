from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, force_authenticate
from portal.models import Task, Committee, User
from django.forms.models import model_to_dict



class TaskTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create(username="test", password="testtest")
        self.committee = Committee.objects.create(
            name="Test Committee", head=self.user)

        self.user2 = User.objects.create(username="test2", password="testtest")
        self.committee2 = Committee.objects.create(
            name="Test Committee 2", head=self.user2)

    def test_view_tasks(self):
        url = reverse('portal_api:listcreate')
        self.client.force_login(self.user)
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_task(self):
        data = {
            "name": "Test Task",
            "description": "Test",
            "creator": 1,
            "committee": 1
        }

        url = reverse('portal_api:listcreate')
        self.client.force_login(self.user)
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_task_no_permission(self):
        self.client.force_login(self.user2)
        task = Task.objects.create(name="TestMe", committee=self.committee, creator=self.user2)

        url = reverse('portal_api:detailcreate', kwargs={"pk": 1})

        response = self.client.patch(url, {
            "id": 1,
            "name": "Edited Task",
        }, format="json")

        print(response.data)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_task(self):
        self.client.force_login(self.user2)
        task = Task.objects.create(
            name="TestMesdf", committee=self.committee2, creator=self.user2)

        url = reverse('portal_api:detailcreate', kwargs={"pk": task.id})

        response = self.client.patch(url, {
            "id": task.id,
            "name": "Edited Task",
        }, format="json")

        print(response.data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

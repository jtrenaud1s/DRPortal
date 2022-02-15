from django.urls import include, path

from portal_api.views import TaskDetail, TaskList

app_name = "portal_api"

urlpatterns = [
    path('auth/', include('portal_auth.urls', namespace='portal_auth')),
    path('tasks/', TaskList.as_view(), name="listcreate"),
    path('tasks/<int:pk>/', TaskDetail.as_view(), name='detailcreate'),

]
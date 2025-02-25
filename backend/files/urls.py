from django.urls import path

from . import views

urlpatterns = [
    path('', views.FileViewSet.as_view()),
    path('<int:pk>/', views.FileDetailView.as_view()),
    path('upload/', views.FileUploadView.as_view()),
]
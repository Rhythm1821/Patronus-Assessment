from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('register/',views.RegistrationView.as_view(),name='register'),
    path('login/',TokenObtainPairView.as_view(),name='login'),
    path('token/refresh/',TokenRefreshView.as_view(),name='refresh'),
    path('<int:pk>/',views.UserViewSet.as_view(),name='user'),
]
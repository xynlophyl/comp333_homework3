from django.urls import path, include
from .api import registrationAPI, loginAPI, userAPI
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', registrationAPI.as_view()),
    path('api/auth/login', loginAPI.as_view()),
    path('api/auth/user', userAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name="knox_logout")
]
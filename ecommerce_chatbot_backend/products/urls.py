from django.urls import path
from . import views
from django.urls import path
from .views_auth import signup, login




urlpatterns = [
    path('products/', views.get_products, name='get_products'),
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
]

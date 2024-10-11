from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import sign_up, login, GodownViewSet, ItemViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'godowns', GodownViewSet, basename='godown')
router.register(r'items', ItemViewSet, basename='item')

urlpatterns = [
    path('signup/', sign_up, name='sign_up'),  # Sign-up endpoint
    path('login/', login, name='login'),        # Login endpoint
    path('', include(router.urls)),              # Include the router URLs
]

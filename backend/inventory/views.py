# inventory/views.py
from rest_framework import viewsets
from .models import Godown, Item
from .serializers import GodownSerializer, ItemSerializer
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

class GodownViewSet(viewsets.ModelViewSet):
    queryset = Godown.objects.all()
    serializer_class = GodownSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_queryset(self):
        queryset = Item.objects.all()
        godown_id = self.request.query_params.get('godown', None)
        if godown_id is not None:
            queryset = queryset.filter(godown_id=godown_id)
        return queryset


@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        # Use authenticate to check credentials
        user = authenticate(request, username=email, password=password)
        
        if user is not None:
            return JsonResponse({'success': True, 'message': 'Login successful.'})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid credentials.'})

    return JsonResponse({'success': False, 'message': 'Invalid request method.'})

@csrf_exempt
def sign_up(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return JsonResponse({'success': False, 'message': 'Email and password are required.'})

        if User.objects.filter(username=email).exists():
            return JsonResponse({'success': False, 'message': 'Email already exists.'})

        # Create a new user
        User.objects.create_user(username=email, email=email, password=password)
        return JsonResponse({'success': True, 'message': 'User created successfully.'})

    return JsonResponse({'success': False, 'message': 'Invalid request method.'})


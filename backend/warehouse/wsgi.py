import os
from django.core.wsgi import get_wsgi_application
import sys

# Add the backend directory to the system path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.warehouse.settings')

application = get_wsgi_application()

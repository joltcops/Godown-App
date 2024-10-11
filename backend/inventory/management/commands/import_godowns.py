import json
import os
from django.core.management.base import BaseCommand
from inventory.models import Godown

class Command(BaseCommand):
    help = 'Import godown data from a JSON file'

    def handle(self, *args, **kwargs):
        # Construct the file path to the fixtures directory
        fixtures_dir = os.path.join(os.path.dirname(__file__), '../../fixtures')
        godowns_file_path = os.path.join(fixtures_dir, 'godowns.json')

        # Load the JSON data from the provided file
        with open(godowns_file_path) as f:
            godowns_data = json.load(f)

        # Create a mapping of ID to Godown instance
        godown_instances = {}

        # Create Godowns
        for godown in godowns_data:
            parent_godown_id = godown.get('parent_godown')
            parent_godown_instance = None

            # Check if the parent_godown exists in the mapping or database
            if parent_godown_id:
                parent_godown_instance = godown_instances.get(parent_godown_id)
                if not parent_godown_instance:
                    # Try to get the parent godown instance from the database
                    try:
                        parent_godown_instance = Godown.objects.get(id=parent_godown_id)
                    except Godown.DoesNotExist:
                        parent_godown_instance = None  # Or handle as needed

            # Check if the Godown already exists
            if Godown.objects.filter(id=godown['id']).exists():
                self.stdout.write(self.style.WARNING(f"Godown with ID {godown['id']} already exists. Skipping."))
                continue  # Skip this entry

            # Create the Godown instance
            new_godown = Godown.objects.create(
                id=godown['id'],
                name=godown['name'],
                parent_godown=parent_godown_instance
            )
            
            # Store the new instance in the mapping
            godown_instances[new_godown.id] = new_godown

        self.stdout.write(self.style.SUCCESS('Godowns imported successfully!'))

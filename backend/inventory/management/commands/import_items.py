import json
import os
from django.core.management.base import BaseCommand
from inventory.models import Item, Godown

class Command(BaseCommand):
    help = 'Import item data from a JSON file'

    def handle(self, *args, **kwargs):
        # Construct the file path to the fixtures directory
        fixtures_dir = os.path.join(os.path.dirname(__file__), '../../fixtures')
        items_file_path = os.path.join(fixtures_dir, 'items.json')

        # Load the JSON data from the provided file
        with open(items_file_path) as f:
            items_data = json.load(f)

        # Create Items
        for item in items_data:
            godown_id = item.get('godown_id')

            # Retrieve the Godown instance
            try:
                godown_instance = Godown.objects.get(id=godown_id)
            except Godown.DoesNotExist:
                self.stdout.write(self.style.WARNING(f"Godown with ID {godown_id} does not exist. Skipping item {item['item_id']}."))
                continue  # Skip this item if the associated Godown does not exist

            # Create the Item instance
            Item.objects.create(
                item_id=item['item_id'],  # Use item_id as the primary key
                name=item['name'],
                quantity=item['quantity'],
                category=item['category'],
                price=item['price'],
                status=item['status'],
                godown=godown_instance,  # Set the foreign key to the retrieved Godown
                brand=item['brand'],
                image_url=item['image_url'],
                attributes=item['attributes']  # Set attributes
            )

        self.stdout.write(self.style.SUCCESS('Items imported successfully!'))

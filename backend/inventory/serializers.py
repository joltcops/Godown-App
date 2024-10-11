# inventory/serializers.py
from rest_framework import serializers
from .models import Godown, Item

# inventory/serializers.py

from rest_framework import serializers
from .models import Godown

class SubGodownSerializer(serializers.ModelSerializer):
    class Meta:
        model = Godown
        fields = ['id', 'name']

class GodownSerializer(serializers.ModelSerializer):
    sub_godowns = SubGodownSerializer(many=True, read_only=True)

    class Meta:
        model = Godown
        fields = ['id', 'name', 'parent_godown', 'sub_godowns']

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['item_id', 'name', 'quantity', 'category', 'price', 'status', 'godown', 'brand', 'image_url', 'attributes']
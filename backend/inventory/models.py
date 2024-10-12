# inventory/models.py
from django.db import models

class Godown(models.Model):
    id = models.CharField(max_length=255, primary_key=True)  
    name = models.CharField(max_length=255)
    parent_godown = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Item(models.Model):
    item_id = models.CharField(max_length=255, primary_key=True)  
    name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    category = models.CharField(max_length=50)
    price = models.FloatField()
    status = models.CharField(max_length=50, choices=[('in_stock', 'In Stock'), ('out_of_stock', 'Out of Stock')])
    godown = models.ForeignKey(Godown, on_delete=models.CASCADE)  
    brand = models.CharField(max_length=100)
    image_url = models.URLField()
    attributes = models.JSONField(null=True)

    def __str__(self):
        return self.name
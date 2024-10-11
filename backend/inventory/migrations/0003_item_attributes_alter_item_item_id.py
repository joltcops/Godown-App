# Generated by Django 5.0.3 on 2024-10-09 13:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0002_remove_item_id_item_item_id_alter_godown_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='attributes',
            field=models.JSONField(null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='item_id',
            field=models.CharField(max_length=255, primary_key=True, serialize=False),
        ),
    ]

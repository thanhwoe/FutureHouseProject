# Generated by Django 3.2 on 2021-05-11 04:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_orderitem_item_variations'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='category',
            field=models.CharField(choices=[('1', 'Bungalow'), ('2', 'Cabin'), ('3', 'Contemporary'), ('4', 'Cottage'), ('5', 'Country'), ('6', 'Craftsman'), ('7', 'Classical'), ('8', 'Modern'), ('9', 'Traditional'), ('10', 'Luxury')], max_length=2),
        ),
    ]

# Generated by Django 3.2 on 2021-07-09 10:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0037_alter_item_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='label',
            field=models.CharField(choices=[('New', 'New'), ('Trending', 'Trending')], max_length=10),
        ),
    ]
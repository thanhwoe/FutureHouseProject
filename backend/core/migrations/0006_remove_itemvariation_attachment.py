# Generated by Django 3.2 on 2021-05-11 04:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_alter_item_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='itemvariation',
            name='attachment',
        ),
    ]

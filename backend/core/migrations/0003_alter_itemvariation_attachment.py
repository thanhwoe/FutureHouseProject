# Generated by Django 3.2 on 2021-05-04 08:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_itemvariation_variation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='itemvariation',
            name='attachment',
            field=models.ImageField(blank=True, upload_to=''),
        ),
    ]
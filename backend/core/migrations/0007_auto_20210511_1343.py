# Generated by Django 3.2 on 2021-05-11 06:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_remove_itemvariation_attachment'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='file_mtl',
            field=models.FileField(default=False, upload_to='documents/'),
        ),
        migrations.AddField(
            model_name='item',
            name='file_obj',
            field=models.FileField(default=False, upload_to='documents/'),
        ),
    ]
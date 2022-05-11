# Generated by Django 3.2 on 2021-07-12 02:00

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0044_auto_20210711_1417'),
    ]

    operations = [
        migrations.AlterField(
            model_name='files3d',
            name='file',
            field=models.FileField(default=False, upload_to=core.models.get_img_filename, verbose_name='File'),
        ),
        migrations.AlterField(
            model_name='item',
            name='thumbnail',
            field=models.ImageField(blank=True, null=True, upload_to=core.models.create_folder, verbose_name='Image'),
        ),
    ]
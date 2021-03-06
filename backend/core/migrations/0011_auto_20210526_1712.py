# Generated by Django 3.2 on 2021-05-26 10:12

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_auto_20210526_1639'),
    ]

    operations = [
        migrations.AlterField(
            model_name='images',
            name='image',
            field=models.ImageField(upload_to=core.models.get_img_filename),
        ),
        migrations.AlterField(
            model_name='item',
            name='file_mtl',
            field=models.FileField(default=False, upload_to=core.models.create_folder),
        ),
        migrations.AlterField(
            model_name='item',
            name='file_obj',
            field=models.FileField(default=False, upload_to=core.models.create_folder),
        ),
        migrations.AlterField(
            model_name='item',
            name='thumbnail',
            field=models.ImageField(default=None, upload_to=core.models.create_folder),
        ),
    ]

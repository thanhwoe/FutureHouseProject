# Generated by Django 3.2 on 2021-07-09 11:00

import core.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0038_alter_item_label'),
    ]

    operations = [
        migrations.CreateModel(
            name='Files3D',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(default=False, upload_to=core.models.create_folder)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='file', to='core.item')),
            ],
        ),
    ]

# Generated by Django 3.2 on 2021-10-30 17:44

import core.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0051_chat'),
    ]

    operations = [
        migrations.CreateModel(
            name='FileDocument',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('document', models.FileField(blank=True, default=False, null=True, upload_to=core.models.get_img_filename, verbose_name='File')),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='document', to='core.item')),
            ],
        ),
    ]
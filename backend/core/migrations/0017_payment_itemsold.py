# Generated by Django 3.2 on 2021-06-26 13:17

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0016_auto_20210623_1452'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='itemSold',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(default=None, null=True), default=[1, 2], size=None),
            preserve_default=False,
        ),
    ]
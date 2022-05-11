# Generated by Django 3.2 on 2021-06-30 05:22

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0019_paymentitem_ispaid'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='itemIDsold',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), default=[1, 3], size=None),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='payment',
            name='listURL',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=255), default=['fg', 'ff'], size=None),
            preserve_default=False,
        ),
    ]
# Generated by Django 3.2 on 2021-07-01 09:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0021_auto_20210701_1624'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='paymentitem',
            name='payment',
        ),
    ]

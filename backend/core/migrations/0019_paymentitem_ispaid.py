# Generated by Django 3.2 on 2021-06-29 18:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0018_auto_20210629_1744'),
    ]

    operations = [
        migrations.AddField(
            model_name='paymentitem',
            name='isPaid',
            field=models.BooleanField(default=False),
        ),
    ]

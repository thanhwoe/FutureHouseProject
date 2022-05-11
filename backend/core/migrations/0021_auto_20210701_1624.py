# Generated by Django 3.2 on 2021-07-01 09:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0020_auto_20210630_1222'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='payment',
            name='items',
        ),
        migrations.AddField(
            model_name='paymentitem',
            name='payment',
            field=models.ForeignKey(default=9, on_delete=django.db.models.deletion.CASCADE, to='core.payment'),
            preserve_default=False,
        ),
    ]

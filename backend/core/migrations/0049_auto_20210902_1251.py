# Generated by Django 3.2 on 2021-09-02 05:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0048_auto_20210830_1843'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='overview',
            field=models.TextField(blank=True, max_length=150, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='description',
            field=models.TextField(blank=True, max_length=500, null=True),
        ),
    ]

# Generated by Django 3.2 on 2021-07-08 12:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0035_auto_20210708_1847'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='isStaff',
            field=models.BooleanField(default=False),
        ),
        migrations.DeleteModel(
            name='UserExtend',
        ),
    ]

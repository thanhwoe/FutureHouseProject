# Generated by Django 3.2 on 2021-07-08 11:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0033_remove_userprofile_isstaff'),
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

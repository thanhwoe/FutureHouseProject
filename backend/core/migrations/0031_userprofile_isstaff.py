# Generated by Django 3.2 on 2021-07-08 10:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0030_alter_post_overview'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='isStaff',
            field=models.BooleanField(default=False),
        ),
    ]

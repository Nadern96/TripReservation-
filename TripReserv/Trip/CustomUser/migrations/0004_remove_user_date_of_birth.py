# Generated by Django 2.2 on 2019-04-07 23:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('CustomUser', '0003_user_date_of_birth'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='date_of_birth',
        ),
    ]

# Generated by Django 2.2 on 2019-04-11 21:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CustomUser', '0002_auto_20190411_1943'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='register_date',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='active',
            field=models.BooleanField(default=False),
        ),
    ]

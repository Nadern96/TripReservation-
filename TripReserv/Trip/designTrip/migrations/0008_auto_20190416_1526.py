# Generated by Django 2.2 on 2019-04-16 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('designTrip', '0007_designtrip_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='designtrip',
            name='budget',
        ),
        migrations.AddField(
            model_name='designtrip',
            name='budget_from',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='designtrip',
            name='budget_to',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]

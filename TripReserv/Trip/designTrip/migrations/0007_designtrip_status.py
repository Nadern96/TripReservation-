# Generated by Django 2.2 on 2019-04-15 15:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('designTrip', '0006_designtrip_form_submitted_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='designtrip',
            name='status',
            field=models.CharField(blank=True, choices=[('Requested', 'Requested'), ('onGoing', 'onGoing'), ('Done', 'Done'), ('Archieve', 'Archieve')], max_length=20, null=True),
        ),
    ]

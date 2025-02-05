# Generated by Django 2.2 on 2019-04-16 11:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('TripPackages', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='city',
            name='about_city',
            field=models.TextField(default=' '),
        ),
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=250)),
                ('about_place', models.TextField(default=' ')),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='TripPackages.City')),
            ],
        ),
    ]

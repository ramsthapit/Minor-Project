# Generated by Django 4.0.1 on 2022-01-12 17:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='title',
        ),
    ]

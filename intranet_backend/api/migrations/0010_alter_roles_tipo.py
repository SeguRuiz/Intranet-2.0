# Generated by Django 5.1.1 on 2024-09-25 21:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_roles_tipo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='roles',
            name='tipo',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]

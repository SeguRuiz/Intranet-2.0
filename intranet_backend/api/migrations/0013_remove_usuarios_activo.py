# Generated by Django 5.1.1 on 2024-09-26 14:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_usuarios_apellidos_alter_usuarios_nombre'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usuarios',
            name='activo',
        ),
    ]
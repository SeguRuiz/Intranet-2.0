# Generated by Django 5.1.1 on 2024-09-25 16:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_roles_usuarios_cedula_usuarios_rol_id'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='usuarios',
            options={},
        ),
        migrations.AlterModelTable(
            name='roles',
            table='Roles',
        ),
        migrations.AlterModelTable(
            name='usuarios',
            table='Usuarios',
        ),
    ]

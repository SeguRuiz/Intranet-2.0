# Generated by Django 5.1.1 on 2024-09-25 16:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_usuarios_rol_id_usuarios_rol'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usuarios',
            old_name='rol',
            new_name='rol_id',
        ),
    ]
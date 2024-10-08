# Generated by Django 5.1.1 on 2024-10-08 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_remove_usuarios_apellidos_remove_usuarios_correo_and_more'),
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='usuarios',
            index=models.Index(fields=['cedula', 'first_name', 'last_name'], name='cedula-nombre-apellidos-indx'),
        ),
    ]
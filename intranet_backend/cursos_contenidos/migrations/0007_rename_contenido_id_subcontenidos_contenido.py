# Generated by Django 5.1.1 on 2024-10-03 03:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cursos_contenidos', '0006_subcontenidos_contenido_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subcontenidos',
            old_name='contenido_id',
            new_name='contenido',
        ),
    ]

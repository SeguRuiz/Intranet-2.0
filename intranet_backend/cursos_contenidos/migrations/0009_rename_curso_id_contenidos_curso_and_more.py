# Generated by Django 5.1.1 on 2024-10-03 03:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cursos_contenidos', '0008_rename_contenido_subcontenidos_contenido_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='contenidos',
            old_name='curso_id',
            new_name='curso',
        ),
        migrations.RenameField(
            model_name='subcontenidos',
            old_name='archivo_id',
            new_name='archivo',
        ),
        migrations.RenameField(
            model_name='subcontenidos',
            old_name='contenido_id',
            new_name='contenido',
        ),
    ]

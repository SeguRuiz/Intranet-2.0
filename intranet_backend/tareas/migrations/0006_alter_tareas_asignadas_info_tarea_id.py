# Generated by Django 5.1.1 on 2024-11-04 01:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tareas', '0005_tareas_asignadas_info_tarea_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tareas_asignadas',
            name='info_tarea_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tareas.info_tareas'),
        ),
    ]

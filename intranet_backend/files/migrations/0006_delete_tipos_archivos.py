# Generated by Django 5.1.1 on 2024-11-01 19:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('files', '0005_archivos_referencia_id_archivo'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Tipos_archivos',
        ),
    ]

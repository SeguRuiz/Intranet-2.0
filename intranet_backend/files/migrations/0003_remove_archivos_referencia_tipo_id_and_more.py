# Generated by Django 5.1.1 on 2024-10-04 17:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('files', '0002_alter_archivos_referencia_table_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='archivos_referencia',
            name='tipo_id',
        ),
        migrations.RemoveField(
            model_name='archivos_referencia',
            name='usuario_id',
        ),
    ]

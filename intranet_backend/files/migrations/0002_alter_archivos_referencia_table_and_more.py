# Generated by Django 5.1.1 on 2024-09-30 21:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('files', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='archivos_referencia',
            table='archivos',
        ),
        migrations.AlterModelTable(
            name='tipos_archivos',
            table='tipos_archivos',
        ),
    ]
# Generated by Django 5.1.1 on 2024-10-29 00:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reportes', '0003_reportes_info_usuario_reporte_and_more'),
    ]

    operations = [
        migrations.RenameIndex(
            model_name='reportes_info',
            new_name='usuario_reporte',
            old_name='usuario-reporte',
        ),
        migrations.RenameIndex(
            model_name='reportes_info',
            new_name='dia_incidente',
            old_name='dia-incidente',
        ),
        migrations.RenameIndex(
            model_name='reportes_info',
            new_name='user_sede_report',
            old_name='user-sede-report',
        ),
    ]

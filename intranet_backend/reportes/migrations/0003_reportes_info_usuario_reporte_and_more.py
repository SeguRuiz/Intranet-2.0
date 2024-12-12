# Generated by Django 5.1.1 on 2024-10-29 00:24

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_merge_20241009_1617'),
        ('cursos', '0017_alter_intengrantes_de_grupo_usuario_id'),
        ('reportes', '0002_alter_reportes_info_estado_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddIndex(
            model_name='reportes_info',
            index=models.Index(fields=['usuario_id'], name='usuario-reporte'),
        ),
        migrations.AddIndex(
            model_name='reportes_info',
            index=models.Index(fields=['dia_incidente'], name='dia-incidente'),
        ),
        migrations.AddIndex(
            model_name='reportes_info',
            index=models.Index(fields=['sede_id', 'usuario_id'], name='user-sede-report'),
        ),
        migrations.AlterModelTable(
            name='reportes_info',
            table='reportes_info',
        ),
    ]
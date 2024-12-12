# Generated by Django 5.1.1 on 2024-10-25 19:31

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cursos', '0017_alter_intengrantes_de_grupo_usuario_id'),
        ('cursos_contenidos', '0015_alter_comunicados_usuario_id'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddIndex(
            model_name='comunicados',
            index=models.Index(fields=['usuario_id'], name='user-comunicado'),
        ),
        migrations.AddIndex(
            model_name='comunicados',
            index=models.Index(fields=['grupo_id'], name='grupo-comunicado'),
        ),
        migrations.AddIndex(
            model_name='comunicados',
            index=models.Index(fields=['curso_id'], name='curso-comunicado'),
        ),
        migrations.AddIndex(
            model_name='comunicados',
            index=models.Index(fields=['id', 'grupo_id'], name='grupo-e-id-com'),
        ),
    ]
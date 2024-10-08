# Generated by Django 5.1.1 on 2024-10-08 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cursos', '0014_alter_cursos_unique_together_cursos_id_cursos_indx'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='grupos_cursos_intermedia',
            unique_together={('curso_id', 'grupo_id')},
        ),
        migrations.AddIndex(
            model_name='grupos_cursos_intermedia',
            index=models.Index(fields=['curso_id', 'grupo_id'], name='GruposCursos-indx'),
        ),
        migrations.AddIndex(
            model_name='grupos_cursos_intermedia',
            index=models.Index(fields=['curso_id'], name='GC-curso_id-indx'),
        ),
        migrations.AddIndex(
            model_name='grupos_cursos_intermedia',
            index=models.Index(fields=['grupo_id'], name='GC-grupo_id-indx'),
        ),
        migrations.AddIndex(
            model_name='grupos_cursos_intermedia',
            index=models.Index(fields=['id'], name='id-GC-indx'),
        ),
    ]

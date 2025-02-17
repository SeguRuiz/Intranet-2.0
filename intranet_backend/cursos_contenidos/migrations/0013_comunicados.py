# Generated by Django 5.1.1 on 2024-10-25 19:06

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cursos', '0017_alter_intengrantes_de_grupo_usuario_id'),
        ('cursos_contenidos', '0012_subcontenidos_subcont_contenido_indx_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comunicados',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('asunto', models.CharField(max_length=100)),
                ('descripcion', models.CharField(max_length=500)),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('fecha_actualizacion', models.DateTimeField(auto_now=True)),
                ('curso_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cursos.cursos')),
                ('grupo_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cursos.grupos')),
            ],
        ),
    ]

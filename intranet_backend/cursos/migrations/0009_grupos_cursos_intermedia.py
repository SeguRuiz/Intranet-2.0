# Generated by Django 5.1.1 on 2024-09-28 19:32

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cursos', '0008_delete_grupos_cursos_intermedia'),
    ]

    operations = [
        migrations.CreateModel(
            name='Grupos_cursos_intermedia',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('curso_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cursos.cursos')),
                ('grupo_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cursos.grupos')),
            ],
            options={
                'db_table': 'grupos_cursos_intermedia',
            },
        ),
    ]
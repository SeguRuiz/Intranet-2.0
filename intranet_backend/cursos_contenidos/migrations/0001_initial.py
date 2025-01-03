# Generated by Django 5.1.1 on 2024-10-02 21:17

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cursos', '0010_alter_sedes_nombre'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contenidos',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('nombre', models.CharField(max_length=150)),
                ('curso_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cursos.cursos')),
            ],
        ),
    ]

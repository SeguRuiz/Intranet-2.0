# Generated by Django 5.1.1 on 2024-10-28 19:57

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api', '0022_merge_20241009_1617'),
        ('cursos', '0017_alter_intengrantes_de_grupo_usuario_id'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Reportes_info',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('dia_incidente', models.DateTimeField(null=True)),
                ('tipo_incidente', models.CharField(choices=[('tardia', 'TARDIA'), ('retiro', 'RETIRO'), ('ausencia', 'AUSENCIA')], default='tardia', max_length=8)),
                ('presento_comprobante', models.BooleanField(default=False)),
                ('fecha_creado', models.DateTimeField(auto_now_add=True)),
                ('detalles', models.CharField(max_length=300)),
                ('estado', models.CharField(choices=[('denegado', 'DENEGADO'), ('aprobado', 'APROBADO'), ('en espera', 'EN ESPERA')], default='en espera', max_length=9)),
                ('estudiante_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.estudiantes')),
                ('sede_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cursos.sedes')),
                ('usuario_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

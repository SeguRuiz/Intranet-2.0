# Generated by Django 5.1.1 on 2024-09-27 16:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cursos', '0002_intengrantes_de_grupo'),
    ]

    operations = [
        migrations.AddField(
            model_name='sedes',
            name='activa',
            field=models.BooleanField(default=True),
        ),
    ]

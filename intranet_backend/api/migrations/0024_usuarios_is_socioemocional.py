# Generated by Django 5.1.1 on 2024-11-01 02:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_alter_estudiantes_activo'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuarios',
            name='is_socioemocional',
            field=models.BooleanField(default=False),
        ),
    ]
# Generated by Django 5.1.1 on 2024-09-28 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_alter_usuarios_correo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuarios',
            name='apellidos',
            field=models.CharField(max_length=500, null=True),
        ),
    ]

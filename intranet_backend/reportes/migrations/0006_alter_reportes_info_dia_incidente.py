# Generated by Django 5.1.1 on 2024-10-29 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reportes', '0005_alter_reportes_info_tipo_incidente'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reportes_info',
            name='dia_incidente',
            field=models.DateField(null=True),
        ),
    ]

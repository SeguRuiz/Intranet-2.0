# Generated by Django 5.1.4 on 2025-02-12 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reportes', '0012_reportes_info_descripcion_comprobante_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reportes_info',
            name='descripcion_comprobante',
            field=models.CharField(default='Sin descripcion', max_length=1000),
        ),
    ]

# Generated by Django 5.1.1 on 2024-10-08 19:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('files', '0004_alter_archivos_referencia_key_and_more'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='archivos_referencia',
            index=models.Index(fields=['id'], name='id-archivo'),
        ),
    ]

# Generated by Django 5.1.1 on 2024-10-08 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_usuarios_email_indx_usuarios_email_id_indx_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='estudiantes',
            unique_together={('id', 'usuario_id')},
        ),
        migrations.AddIndex(
            model_name='estudiantes',
            index=models.Index(fields=['usuario_id'], name='usuario_id-indx'),
        ),
        migrations.AddIndex(
            model_name='estudiantes',
            index=models.Index(fields=['usuario_id', 'activo'], name='usuario_id-activo-indx'),
        ),
        migrations.AddIndex(
            model_name='estudiantes',
            index=models.Index(fields=['id'], name='id-indx'),
        ),
        migrations.AddIndex(
            model_name='roles',
            index=models.Index(fields=['tipo', 'id'], name='tipo-id-indx'),
        ),
        migrations.AddIndex(
            model_name='roles',
            index=models.Index(fields=['tipo'], name='tipo-indx'),
        ),
    ]
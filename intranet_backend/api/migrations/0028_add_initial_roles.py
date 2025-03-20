from django.db import migrations


def add_initial_roles(apps, schema_editor):
    Roles = apps.get_model("api", "Roles")

    # Define the initial roles
    initial_roles = ["estudiante", "profesor", "admin", "socioemocional"]

    # Create each role if it doesn't exist
    for role_type in initial_roles:
        Roles.objects.get_or_create(tipo=role_type, defaults={"tipo": role_type})


def remove_initial_roles(apps, schema_editor):
    Roles = apps.get_model("api", "Roles")
    Roles.objects.filter(
        tipo__in=["estudiante", "profesor", "admin", "socioemocional"]
    ).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0027_usuarios_perfilurl"),
    ]

    operations = [
        migrations.RunPython(add_initial_roles, remove_initial_roles),
    ]

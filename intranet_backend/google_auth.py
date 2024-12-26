import json
import os

from dotenv import load_dotenv
from pyprojroot import here, find_root

load_dotenv()
project_root = find_root('.here')

def read_credentials():
    # se crea un diccionaro copiando el json de las credenciales del gooogle service account
    creds = {
        "type": "service_account",
        "project_id": os.getenv("GOOGLE_PROJECT_ID"),
        "private_key_id": os.getenv("GOOGLE_PRIVATE_ID"),
        "private_key": os.getenv("GOOGLE_PRIVATE_KEY").replace("\\n", "\n"),
        "client_email": os.getenv("GOOGLE_CLIENT_EMAIL"),
        "client_id": os.getenv("GOOGLE_CLIENT_ID"),
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": os.getenv("GOOGLE_CLIENT_X509_CERT_URL"),
        "universe_domain": "googleapis.com",
    }
    # y luego en base a ese diccionario creamos un json temporal para que sea usado para autenticacion de la cuenta
    with open(project_root / os.getenv("GOOGLE_CREDENTIALS_FILE"), "w+") as f:
        f.write(json.dumps(creds))

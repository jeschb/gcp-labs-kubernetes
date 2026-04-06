GCP Container Registry Setup

Crear un registro en Google Cloud Platform para alojar tu imagen Docker.

PREREQUISITOS
- Cuenta de Google Cloud activa
- Proyecto de GCP creado
- gcloud CLI instalado y configurado
- Docker instalado

PASOS

1. Configurar el Proyecto de GCP

Establece el ID del proyecto que usaras:

   gcloud config set project [PROJECT_ID]

Reemplaza [PROJECT_ID] con tu ID de proyecto. Puedes obtenerlo con:

   gcloud projects list

2. Verificar que el registro esta habilitado

El Google Container Registry debe estar habilitado. Habilita la API si es necesario:

   gcloud services enable containerregistry.googleapis.com

3. Configurar autenticacion con Docker

Configura Docker para autenticarse con GCR:

   gcloud auth configure-docker

Esto creara las credenciales necesarias en ~/.docker/config.json

4. Crear el resgistry (opcional, se crea automaticamente)

El registro se crea automaticamente cuando haces el primer push. No necesitas crear nada manualmente.

5. Generar la URL del Registro

Tu URL del registro sera:

   gcr.io/[PROJECT_ID]/gcp-labs-kubernetes:latest

Ejemplo si tu PROJECT_ID es "mi-proyecto-123456":

   gcr.io/mi-proyecto-123456/gcp-labs-kubernetes:latest

6. Verificar acceso (opcional)

Para verificar que Docker tiene acceso al registro:

   gcloud auth list

Debes ver gcloud CLI autenticado.

7. Guardar tu PROJECT_ID

Guarda tu PROJECT_ID porque lo necesitaras en los pasos siguientes:

   export GCP_PROJECT_ID=[PROJECT_ID]
   echo $GCP_PROJECT_ID

REFERENCIAS UTILES

Ver todos los proyectos:
   gcloud projects list

Cambiar de proyecto:
   gcloud config set project [PROJECT_ID]

Ver el proyecto actual:
   gcloud config get-value project

SIGUIENTE PASO

Una vez completado este paso, ve a 02-BUILD-PUSH.md para construir y enviar la imagen.

Build y Push de Imagen Docker

Construir la imagen Docker y enviarla al Google Container Registry.

PREREQUISITOS
- Completado: 01-GCP-REGISTRY.md
- Docker instalado y ejecutando
- Tienes tu PROJECT_ID de GCP
- Autenticacion de gcloud configurada

VARIABLES A REEMPLAZAR

En todos los comandos de esta guia, reemplaza:

   [PROJECT_ID] - Tu ID de proyecto de GCP (ejemplo: mi-proyecto-123456)

PASO 1: Construir la Imagen

Navega a la carpeta de la aplicacion:

   cd app

Construye la imagen con el nombre correcto:

   docker build -t gcr.io/[PROJECT_ID]/gcp-labs-kubernetes:latest .

Ejemplo:

   docker build -t gcr.io/mi-proyecto-123456/gcp-labs-kubernetes:latest .

Esperado: El build debe completar exitosamente mostrando "Successfully tagged..."

PASO 2: Verificar la Imagen

Verifica que la imagen se creo correctamente:

   docker images | grep gcp-labs-kubernetes

Debes ver tu imagen listada.

PASO 3: Probar la Imagen Localmente (Opcional)

Antes de subir, puedes probar la imagen localmente:

   docker run -d -p 3000:3000 --name test-gcp-labs gcr.io/[PROJECT_ID]/gcp-labs-kubernetes:latest

Verifica:

   curl http://localhost:3000

Detente el contenedor cuando termines:

   docker stop test-gcp-labs
   docker rm test-gcp-labs

PASO 4: Autenticarse con Google Cloud

Asegura que tienes autorizacion para subir a GCR:

   gcloud auth configure-docker

PASO 5: Push de la Imagen a GCR

Enviar la imagen al Google Container Registry:

   docker push gcr.io/[PROJECT_ID]/gcp-labs-kubernetes:latest

Este proceso puede tardar varios minutos dependiendo del tamaño de la imagen.

Esperado: El comando completara con "Digest: sha256:..." y "Status: Pushed"

PASO 6: Verificar en GCP (Opcional)

Puedes verificar que se subio correctamente listando las imagenes en GCR:

   gcloud container images list

O ver las imagenes del repositorio especifico:

   gcloud container images list --repository=gcr.io/[PROJECT_ID]

PASO 7: Crear Tags Adicionales (Opcional)

Si deseas tener multiples versiones:

   docker tag gcr.io/[PROJECT_ID]/gcp-labs-kubernetes:latest gcr.io/[PROJECT_ID]/gcp-labs-kubernetes:v1.0
   docker push gcr.io/[PROJECT_ID]/gcp-labs-kubernetes:v1.0

SIGUIENTE PASO

Una vez que la imagen esta en el registry, ve a 03-DEPLOY.md para desplegar en Kubernetes.

COMANDOS RAPIDOS RESUMIDOS

   export GCP_PROJECT_ID=[PROJECT_ID]
   cd app
   docker build -t gcr.io/$GCP_PROJECT_ID/gcp-labs-kubernetes:latest .
   docker push gcr.io/$GCP_PROJECT_ID/gcp-labs-kubernetes:latest

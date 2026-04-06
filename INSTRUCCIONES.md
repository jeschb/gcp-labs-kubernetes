INSTRUCCIONES PRINCIPALES

Este documento resume el flujo completo del laboratorio.

ARCHIVOS MD PRINCIPALES A LEER EN ORDEN

1. 01-GCP-REGISTRY.md
   - Prepara tu Google Container Registry en GCP
   - Configura autenticacion de Docker
   - Toma 5-10 minutos

2. 02-BUILD-PUSH.md
   - Construye la imagen Docker desde la carpeta app
   - Envía la imagen a tu registry
   - Verifica que la imagen se subió correctamente
   - Toma 5-15 minutos segun velocidad de conexion

3. 03-DEPLOY.md
   - Despliega todos los yamls en orden correcto
   - Verifica que los pods estan running
   - Accede a la aplicacion web
   - Toma 5-10 minutos

FLUJO COMPLETO EN COMANDOS

Paso 1: Preparar GCP
   gcloud config set project [PROJECT_ID]
   gcloud auth configure-docker

Paso 2: Construir imagen (estando en carpeta app)
   docker build -t gcr.io/[PROJECT_ID]/gcp-labs-kubernetes:latest .

Paso 3: Enviar imagen a registry
   docker push gcr.io/[PROJECT_ID]/gcp-labs-kubernetes:latest

Paso 4: Actualizar deployment
   Edita devops/02-deployment.yaml
   Reemplaza [PROJECT_ID] con tu ID real

Paso 5: Desplegar en Kubernetes
   kubectl apply -f devops/01-namespace.yaml
   kubectl apply -f devops/05-configmap.yaml
   kubectl apply -f devops/06-secret.yaml
   kubectl apply -f devops/02-deployment.yaml
   kubectl apply -f devops/03-service.yaml

Paso 6: Acceder
   kubectl port-forward svc/gcp-lab-app-service 3000:80 -n gcplab
   Abre http://localhost:3000 en tu navegador

ESTRUCTURA FINAL

app/
  - Dockerfile
  - server.js
  - package.json
  - public/index.html
  - .gitignore

devops/
  - 01-namespace.yaml
  - 02-deployment.yaml
  - 03-service.yaml
  - 05-configmap.yaml
  - 06-secret.yaml

Documentacion:
  - README.md (Guia general)
  - 01-GCP-REGISTRY.md (Setup del registry)
  - 02-BUILD-PUSH.md (Build y push)
  - 03-DEPLOY.md (Despliegue)
  - INSTRUCCIONES.md (Este archivo)

QUE HACE CADA COMPONENTE

app/ (Aplicacion)
  - Servidor Node.js que muestra informacion del pod
  - Lee variables de ConfigMap y Secret
  - Expone HTTP en puerto 3000

01-namespace.yaml
  - Crea namespace 'gcplab' para aislar recursos

05-configmap.yaml
  - Almacena configuracion no sensible
  - NAMESPACE_NAME, APP_NAME, LAB_DESCRIPTION, etc

06-secret.yaml
  - Almacena datos sensibles en base64
  - APP_CREATION_TIMESTAMP, TEACHER_EMAIL, TEACHER_NAME

02-deployment.yaml
  - Define como se ejecutan los pods
  - Especifica la imagen desde GCR
  - Inyecta variables de ConfigMap y Secret
  - Configura health checks

03-service.yaml
  - LoadBalancer: Acceso externo a la aplicacion
  - ClusterIP: Acceso interno

IMPORTANTE

IMAGE_NAME

La imagen se llama: gcp-labs-kubernetes

Debes reemplazar [PROJECT_ID] en:
- Comandos docker
- devops/02-deployment.yaml

Ejemplo para proyecto con ID "mi-proyecto-2024":
  gcr.io/mi-proyecto-2024/gcp-labs-kubernetes:latest

VARIABLES DE ENTORNO

La aplicacion recibe automaticamente:

From ConfigMap (devops/05-configmap.yaml):
  NAMESPACE_NAME=gcplab
  APP_NAME=gcp-labs-kubernetes
  LAB_DESCRIPTION=Laboratorio Interactivo de Kubernetes en GCP
  COURSE_VERSION=2026-03-GCP-Fundamentos

From Secret (devops/06-secret.yaml, en base64):
  APP_CREATION_TIMESTAMP=2026-04-06T00:00:00Z
  TEACHER_EMAIL=jeschb@gmail.com
  TEACHER_NAME=Ing Jesús A. Chávez Becerra

VERIFICACION PASO A PASO

Paso 1: Despues de desplegar, verifica que exista el pod
  kubectl get pods -n gcplab
  Debe mostrar: NAME STATUS READY
  Espera hasta que STATUS=Running y READY=1/1

Paso 2: Verifica ConfigMap
  kubectl get configmap -n gcplab

Paso 3: Verifica Secret
  kubectl get secret -n gcplab

Paso 4: Verifica servicios
  kubectl get svc -n gcplab

Paso 5: Verifica que la app receibe las variables
  kubectl exec <pod-name> -n gcplab -- env | grep APP

Paso 6: Accede a la aplicacion
  http://localhost:3000

COMANDOS DE ADMINISTRACION

Escalar a 3 replicas:
  kubectl scale deployment gcp-lab-app --replicas=3 -n gcplab

Ver pods en tiempo real:
  kubectl get pods -n gcplab --watch

Ver logs:
  kubectl logs <pod-name> -n gcplab

Acceder al pod (shell):
  kubectl exec -it <pod-name> -n gcplab -- /bin/sh

Eliminar todo:
  kubectl delete namespace gcplab

SOPORTE

Instructor: Ing Jesús A. Chávez Becerra
Email: jeschb@gmail.com

Lee los documentos MD para mas detalles.

Deploy en Kubernetes desde GCP Registry

Desplegar la aplicacion en Kubernetes usando la imagen del Google Container Registry.

PREREQUISITOS
- Completado: 01-GCP-REGISTRY.md
- Completado: 02-BUILD-PUSH.md
- kubectl instalado y configurado
- Acceso a un cluster de Kubernetes (GKE recomendado)
- Tu PROJECT_ID de GCP

VARIABLES A REEMPLAZAR

En todos los comandos de esta guia, reemplaza:

   [PROJECT_ID] - Tu ID de proyecto de GCP

PASO 1: Actualizar el Deployment con tu PROJECT_ID

Edita devops/02-deployment.yaml y reemplaza:

   image: gcr.io/[PROJECT_ID]/gcp-labs-kubernetes:latest

Por tu PROJECT_ID real. Ejemplo:

   image: gcr.io/mi-proyecto-123456/gcp-labs-kubernetes:latest

Comando para reemplazar automaticamente (en bash):

   sed -i 's/\[PROJECT_ID\]/mi-proyecto-123456/g' devops/02-deployment.yaml

PASO 2: Crear el Namespace

Crea el namespace del laboratorio:

   kubectl apply -f devops/01-namespace.yaml

Verifica:

   kubectl get namespace gcplab

PASO 3: Crear ConfigMap

Despliega la configuracion:

   kubectl apply -f devops/05-configmap.yaml

Verifica:

   kubectl get configmap -n gcplab
   kubectl describe configmap gcplab-cm -n gcplab

PASO 4: Crear Secret

Despliega los datos sensibles:

   kubectl apply -f devops/06-secret.yaml

Verifica:

   kubectl get secret -n gcplab
   kubectl describe secret gcplab-secret -n gcplab

Para ver los valores decodificados:

   kubectl get secret gcplab-secret -n gcplab -o yaml

PASO 5: Desplegar la Aplicacion

Despliega el deployment:

   kubectl apply -f devops/02-deployment.yaml

Verifica que el pod se esta ejecutando:

   kubectl get pods -n gcplab
   kubectl get pods -n gcplab --watch

Espera hasta que veas: STATUS = Running y READY = 1/1

PASO 6: Crear los Servicios

Despliega los servicios para acceder a la aplicacion:

   kubectl apply -f devops/03-service.yaml

Verifica:

   kubectl get svc -n gcplab

PASO 7: Acceder a la Aplicacion

Si usas un cluster local (Minikube, Docker Desktop):

Usa port-forward:

   kubectl port-forward svc/gcp-lab-app-service 3000:80 -n gcplab

Abre en el navegador: http://localhost:3000

Si usas GKE u otro cloud provider:

Verifica la IP externa:

   kubectl get svc -n gcplab

Y accede a http://[EXTERNAL-IP]

(Nota: Puede tardar 1-2 minutos para asignar la IP externa)

VERIFICACION COMPLETA

Ver todos los recursos creados:

   kubectl get all -n gcplab

Ver logs del pod:

   kubectl logs <pod-name> -n gcplab

Ver variables de entorno en el pod:

   kubectl exec <pod-name> -n gcplab -- env | grep -E "APP_|NAMESPACE|TEACHER|CREATION"

Acceder al pod (shell interactivo):

   kubectl exec -it <pod-name> -n gcplab -- /bin/sh

ESCALADO (OPCIONAL)

Escala el deployment a multiples replicas:

   kubectl scale deployment gcp-lab-app --replicas=3 -n gcplab

Monitorea el escalado:

   kubectl get pods -n gcplab --watch

LIMPIEZA (CUANDO TERMINES)

Elimina todos los recursos:

   kubectl delete namespace gcplab

SIGUIENTE PASO

Tu laboratorio Kubernetes esta en ejecucion. Ahora puedes:
- Escalar el deployment
- Estudiar los Secrets y ConfigMaps
- Analizar los logs
- Ejecutar cambios en la aplicacion

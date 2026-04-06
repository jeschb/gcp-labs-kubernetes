# GCP Kubernetes Lab - Laboratorio Interactivo

Laboratorio educativo de Kubernetes en Google Cloud Platform.

Instructor: Ing Jesús A. Chávez Becerra
Email: jeschb@gmail.com
Asignatura: Fundamentos de GCP
Año: 2026

## Descripcion

Laboratorio completo para enseñar los conceptos fundamentales de Kubernetes:
- Despliegue de aplicaciones en contenedores
- Gestion de configuracion con ConfigMaps
- Manejo de datos sensibles con Secrets
- Escalado de replicas
- Observabilidad y health checks
- Integracion con Google Cloud Platform (GCP)

## Estructura del Proyecto

```
app/
  - Dockerfile: Imagen de la aplicacion
  - server.js: Servidor Node.js con Express
  - package.json: Dependencias
  - public/index.html: Interfaz web

devops/
  - 01-namespace.yaml: Namespace 'gcplab'
  - 02-deployment.yaml: Deployment de la app
  - 03-service.yaml: LoadBalancer y ClusterIP
  - 05-configmap.yaml: Configuracion no sensible
  - 06-secret.yaml: Datos sensibles en base64

Documentacion:
  - 01-GCP-REGISTRY.md: Configurar registry en GCP
  - 02-BUILD-PUSH.md: Construir y enviar imagen
  - 03-DEPLOY.md: Desplegar en Kubernetes
  - README.md: Este archivo
```

## Inicio Rapido

Lee los archivos en este orden:

1. **01-GCP-REGISTRY.md** - Prepara tu registry en GCP
2. **02-BUILD-PUSH.md** - Construye y envía la imagen Docker
3. **03-DEPLOY.md** - Despliega en Kubernetes

## Flujo Completo Resumido

Paso 1: Preparar GCP
```
gcloud config set project [PROJECT_ID]
gcloud auth configure-docker
```

Paso 2: Construir y enviar imagen
```
cd app
docker build -t gcr.io/[PROJECT_ID]/gcp-labs-kubernetes:latest .
docker push gcr.io/[PROJECT_ID]/gcp-labs-kubernetes:latest
```

Paso 3: Actualizar Deployment
```
Edita devops/02-deployment.yaml
Reemplaza [PROJECT_ID] con tu ID real
```

Paso 4: Desplegar en Kubernetes
```
kubectl apply -f devops/01-namespace.yaml
kubectl apply -f devops/05-configmap.yaml
kubectl apply -f devops/06-secret.yaml
kubectl apply -f devops/02-deployment.yaml
kubectl apply -f devops/03-service.yaml
```

Paso 5: Acceder
```
kubectl port-forward svc/gcp-lab-app-service 3000:80 -n gcplab
Abre http://localhost:3000
```

## Requisitos

- kubectl >= 1.24
- Docker instalado
- Google Cloud SDK (gcloud)
- Acceso a un cluster de Kubernetes

Verificar:
```
kubectl version --client
docker --version
gcloud --version
```

## Conceptos Educativos

Kubernetes
- Pods: Unidad minima de despliegue
- Deployments: Gestion de replicas y actualizaciones
- Services: Exposicion y networking
- Namespaces: Aislamiento de recursos

Configuracion y Secretos
- ConfigMaps: Datos no sensibles en texto plano
- Secrets: Datos sensibles codificados en base64
- envFrom: Inyeccion de variables de entorno

Escalado
- kubectl scale: Escalado manual de replicas
- RollingUpdate: Actualizaciones sin downtime
- Pod Disruption Budget: Alta disponibilidad

Observabilidad
- Health checks: Liveness y Readiness Probes
- Logs: Ver salida de la aplicacion
- Events: Eventos del cluster

## Comandos Comunes

Ver todos los recursos:
```
kubectl get all -n gcplab
```

Ver pods en tiempo real:
```
kubectl get pods -n gcplab --watch
```

Ver logs:
```
kubectl logs <pod-name> -n gcplab
```

Acceder al pod (shell):
```
kubectl exec -it <pod-name> -n gcplab -- /bin/sh
```

Escalar deployment:
```
kubectl scale deployment gcp-lab-app --replicas=3 -n gcplab
```

Ver ConfigMap:
```
kubectl get configmap gcplab-cm -n gcplab
kubectl describe configmap gcplab-cm -n gcplab
```

Ver Secret:
```
kubectl get secret gcplab-secret -n gcplab
```

Ver variables de entorno del pod:
```
kubectl exec <pod-name> -n gcplab -- env
```

## Decodificar Secretos

Los datos en el Secret estan en base64 (no encriptados).

Ver en Bash:
```
kubectl get secret gcplab-secret -n gcplab -o jsonpath='{.data.TEACHER_EMAIL}' | base64 -d
```

Ver en PowerShell:
```
$encoded = kubectl get secret gcplab-secret -n gcplab -o jsonpath='{.data.TEACHER_EMAIL}'
[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($encoded))
```

## Limpieza

Eliminar todo el laboratorio:
```
kubectl delete namespace gcplab
```

## Notas Importantes

GCP Project ID: Necesitas tener un Project ID. Ver con:
```
gcloud projects list
```

Autenticacion: Ejecuta una sola vez:
```
gcloud auth configure-docker
```

Base64 no es Encriptacion: Los Secrets solo estan en base64.
En produccion, habilita encriptacion en etcd.

Costos: Google Container Registry tiene costos de almacenamiento.
Limpia tus imagenes antiguas cuando no las uses.

## Troubleshooting

Pod en estado Pending:
```
kubectl describe pod <pod-name> -n gcplab
kubectl get nodes
```

Sin IP externa en LoadBalancer (normal en clusters locales):
```
kubectl port-forward svc/gcp-lab-app-service 3000:80 -n gcplab
```

Pod en CrashLoopBackOff:
```
kubectl logs <pod-name> -n gcplab
kubectl describe pod <pod-name> -n gcplab
```

## Contacto

Instructor: Ing Jesús A. Chávez Becerra
Email: jeschb@gmail.com

---

## 📞 Contacto y Soporte

**Docente:** Ing Jesús A. Chávez Becerra  
**Email:** jeschb@gmail.com  
**Asignatura:** Fundamentos de GCP  
**Año:** 2026

---

## 📄 Licencia

Laboratorio educativo creado para propósitos didácticos.

---

## 🙏 Créditos

- **Desarrollador:** Ing Jesús A. Chávez Becerra
- **Basado en:** Kubernetes Documentation, GCP Best Practices
- **Herramientas:** kubectl, Docker, Kubernetes, GCP

---

**¡Happy Learning! 🚀**

Última actualización: Abril 2026

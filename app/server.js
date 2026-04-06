const express = require('express');
const os = require('os');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Obtener variables del ConfigMap - gcplab-cm
const appName = process.env.APP_NAME || 'gcp-lab-app';
const namespaceName = process.env.NAMESPACE_NAME || 'gcplab';
const labDescription = process.env.LAB_DESCRIPTION || 'Laboratorio de Kubernetes en GCP';

// Obtener variables del Secret - gcplab-secret
const appCreationTimestamp = process.env.APP_CREATION_TIMESTAMP || new Date().toISOString();
const teacherEmail = process.env.TEACHER_EMAIL || 'jeschb@gmail.com';
const teacherName = process.env.TEACHER_NAME || 'Ing Jesús A. Chávez Becerra';

// Obtener información del pod desde variables de entorno
const podName = process.env.POD_NAME || process.env.HOSTNAME || os.hostname();
const namespace = process.env.POD_NAMESPACE || process.env.NAMESPACE || 'default';

// Servir archivos estáticos
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API para obtener información del pod
app.get('/api/pod-info', (req, res) => {
  res.json({
    podName: podName,
    namespace: namespace,
    appName: appName,
    timestamp: appCreationTimestamp,
    nodeHostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    teacher: {
      name: teacherName,
      email: teacherEmail
    }
  });
});

// API para obtener comandos kubectl
app.get('/api/kubectl-commands', (req, res) => {
  const commands = {
    viewPods: `kubectl get pods -n ${namespaceName}`,
    viewDeployments: `kubectl get deployments -n ${namespaceName}`,
    scalePods: `kubectl scale deployment ${appName} --replicas=3 -n ${namespaceName}`,
    scaleDown: `kubectl scale deployment ${appName} --replicas=1 -n ${namespaceName}`,
    viewLogs: `kubectl logs ${podName} -n ${namespaceName}`,
    describeDeployment: `kubectl describe deployment ${appName} -n ${namespaceName}`,
    deleteDeployment: `kubectl delete deployment ${appName} -n ${namespaceName}`,
    getAllResources: `kubectl get all -n ${namespaceName}`,
    portForward: `kubectl port-forward ${podName} 3000:3000 -n ${namespaceName}`,
    watchPods: `kubectl get pods -n ${namespaceName} --watch`
  };
  res.json(commands);
});

app.listen(PORT, () => {
  console.log(`🚀 ${labDescription}`);
  console.log(`📦 Aplicación: ${appName} - Pod: ${podName}`);
  console.log(`🏢 Namespace: ${namespaceName}`);
  console.log(`👨‍🏫 Creado por: ${teacherName}`);
  console.log(`📊 Servidor escuchando en puerto ${PORT}`);
  console.log(`🔗 http://localhost:${PORT}`);
});

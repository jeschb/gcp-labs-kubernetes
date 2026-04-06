# Dockerfile - GCP Kubernetes Lab
# Creado por: Ing Jesús A. Chávez Becerra <jeschb@gmail.com>
# Laboratorio de Kubernetes en GCP - 2026

FROM node:18-alpine

# Metadatos y Labels
LABEL maintainer="Ing Jesús A. Chávez Becerra <jeschb@gmail.com>"
LABEL description="Aplicación Front-end para Laboratorio de Kubernetes en GCP"
LABEL version="1.0.0"
LABEL course="GCP-Fundamentos-2026"
LABEL creator="jeschb"
LABEL project="gcp-labs-kubernetes"
LABEL environment="educational"

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000
ENV NAMESPACE=gcplab

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json ./

# Instalar dependencias
RUN npm install --production

# Copiar la aplicación
COPY server.js ./
COPY public ./public

# Exponer puerto
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/pod-info', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Comando de inicio
CMD ["npm", "start"]

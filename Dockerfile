# Imagen oficial ligera de Node.js
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias de produccion
RUN npm ci --omit=dev

# Copiar codigo fuente
COPY src/ ./src/

# Ejecutar como usuario sin privilegios
USER node

# Puerto de la aplicacion
EXPOSE 3000

# Iniciar servidor
CMD ["node", "src/index.js"]

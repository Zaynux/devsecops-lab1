# Laboratorio 3.1 — Control de Versiones, Pipelines Iniciales y Docker Seguro

**Asignatura:** Desarrollo Seguro / DevSecOps & Cloud Security  
**Entorno:** AWS Learner Lab · Ubuntu 24.04 LTS · Node.js 20 · Express · GitHub Actions · Docker

## Objetivo
Implementar una aplicación web de prueba versionada en GitHub, validarla automáticamente mediante integración continua y ejecutarla en un contenedor Docker con un usuario sin privilegios.

## Estructura del proyecto
```text
.
├── .github/workflows/ci.yml
├── src/index.js
├── Dockerfile
├── .dockerignore
├── .gitignore
├── package.json
├── package-lock.json
└── evidencias/              # Capturas del laboratorio
```

## Verificación en GitHub (sin usar AWS)
- [Historial de GitHub Actions](https://github.com/Zaynux/devsecops-lab1/actions)
- La ejecución **Agregando pipeline base de GitHub Actions** terminó correctamente.
- La ejecución **Implementar contenedor Docker seguro** terminó correctamente.
- La ejecución **Prueba de fallo intencional** falló, como correspondía al código deliberadamente defectuoso.
- La ejecución **Revert "Prueba de fallo intencional"** terminó correctamente. Esta es la validación final del código restaurado.

En la universidad basta con abrir este repositorio y la pestaña **Actions** para mostrar la evidencia de CI. No hace falta reconstruir nada para enseñar las ejecuciones históricas.

## Verificar Docker en AWS (si se pide demostración en vivo)
AWS Learner Lab debe estar **iniciado** y la instancia EC2 original **encendida**. La IP pública puede cambiar después de detener la instancia. Conéctate desde PowerShell usando **tu propia llave privada** (nunca la subas al repositorio):

```powershell
ssh -i "D:\DDescargas\devsecops-1.pem" ubuntu@IP_PUBLICA_ACTUAL
```

Dentro de Ubuntu:

```bash
cd ~/devsecops-app
docker ps
docker exec mi-app-segura whoami
curl http://localhost:3000
```

El comando `whoami` debe mostrar `node`. Si el contenedor existe, pero está detenido:

```bash
docker start mi-app-segura
```

Si se eliminó el contenedor, pero la imagen persiste:

```bash
docker run -d --name mi-app-segura -p 3000:3000 devsecops-app:latest
```

Si ya no existe la imagen, pero sí el código del proyecto en la EC2:

```bash
cd ~/devsecops-app
docker build -t devsecops-app:latest .
docker run -d --name mi-app-segura -p 3000:3000 devsecops-app:latest
```

**Importante:** GitHub guarda el código y los resultados de Actions, pero **no** mantiene activa una instancia AWS ni guarda automáticamente su contenedor en ejecución.

## Evidencias
Las capturas del laboratorio se organizarán en `evidencias/`:

- [01-pipeline-verde.png](evidencias/01-pipeline-verde.png): última ejecución exitosa de GitHub Actions.
- [02-docker-usuario-node.png](evidencias/02-docker-usuario-node.png): `docker exec mi-app-segura whoami` devuelve `node`.
- [03-pipeline-fallo-controlado.png](evidencias/03-pipeline-fallo-controlado.png): error intencional detectado por CI.

Las dos primeras son las evidencias solicitadas en el laboratorio; la tercera complementa la demostración.

## Seguridad aplicada
- `USER node` en Dockerfile para no ejecutar la aplicación como `root`.
- `node:20-alpine` como imagen base ligera.
- `.dockerignore` excluye dependencias locales, historial Git y posibles secretos.
- `.gitignore` evita incorporar llaves privadas, archivos `.env` y dependencias.
- Las llaves `.pem`, llaves SSH privadas y tokens **nunca** deben subirse a GitHub.

## Próximos laboratorios
- **3.2:** Pruebas SAST (pendiente de instrucciones del profesor).
- **3.3:** Entornos DB / WEB / APP (pendiente de instrucciones del profesor).

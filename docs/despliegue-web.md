# Guía de despliegue a producción

## Estructura creada

```
proyect-peli/
├── vercel.json          ← configuración para Vercel (frontend)
├── api/
│   ├── server.js        ← servidor json-server con CORS
│   ├── package.json     ← dependencias del servidor
│   └── db.json          ← datos iniciales de películas
└── src/environments/
    └── environment.prod.ts  ← apunta a la URL de Render.com
```

---

## PASO 1 — Subir el código a GitHub

1. Ve a [github.com](https://github.com) y crea una cuenta (si no tienes).
2. Crea un repositorio nuevo (puede ser público o privado).
3. En tu terminal del proyecto ejecuta:

```bash
git init
git add .
git commit -m "primer commit"
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

---

## PASO 2 — Desplegar la API en Render.com (gratis)

1. Ve a [render.com](https://render.com) y crea una cuenta gratuita.
2. Haz clic en **New → Web Service**.
3. Conecta tu repositorio de GitHub.
4. Configura el servicio así:

| Campo | Valor |
|---|---|
| **Name** | proyect-peli-api |
| **Root Directory** | `api` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | Free |

5. Haz clic en **Create Web Service**.
6. Espera a que termine el despliegue. Te dará una URL como:
   `https://proyect-peli-api.onrender.com`

> ⚠️ **Limitación del tier gratuito de Render**: El servicio se "duerme" si no recibe tráfico en 15 minutos. La primera petición tardará ~30 segundos en despertar. Los datos añadidos/editados se pierden si el servicio se reinicia (el filesystem es efímero).

---

## PASO 3 — Actualizar la URL de la API en el proyecto

Abre `src/environments/environment.prod.ts` y reemplaza la URL:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://proyect-peli-api.onrender.com'  // ← pon aquí tu URL real de Render
};
```

Luego haz commit y push:

```bash
git add src/environments/environment.prod.ts
git commit -m "actualiza URL de API para producción"
git push
```

---

## PASO 4 — Desplegar el frontend en Vercel (gratis)

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta gratuita (puedes entrar con tu cuenta de GitHub).
2. Haz clic en **Add New → Project**.
3. Selecciona tu repositorio de GitHub.
4. Vercel detectará automáticamente la configuración gracias al `vercel.json`.
   - Si pide confirmación: **Build Command** = `npm run build`, **Output Directory** = `www`.
5. Haz clic en **Deploy**.
6. En unos minutos tendrás tu app en una URL como:
   `https://proyect-peli.vercel.app`

---

## Resumen de URLs finales

| Servicio | URL |
|---|---|
| App (Vercel) | `https://proyect-peli.vercel.app` |
| API (Render) | `https://proyect-peli-api.onrender.com` |

---

## Preguntas frecuentes

**¿Es 100% gratis?**
Sí. Vercel y Render tienen tiers gratuitos más que suficientes para proyectos personales/académicos.

**¿Los datos se guardan para siempre?**
En el tier gratuito de Render, el sistema de archivos es efímero: los datos añadidos/editados desde la app se pierden cuando el servicio se reinicia. Los datos del `db.json` original siempre se restauran. Para datos persistentes reales necesitarías migrar a MongoDB Atlas o Supabase (ambos gratuitos).

**¿Las imágenes de las películas se verán?**
Las imágenes están en `src/assets/images/`. Al hacer build, se incluyen en la carpeta `www/` que Vercel sirve. Sí funcionarán.

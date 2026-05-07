# UT6 - Documentación del Proyecto Nativo (RA4 + RA2)

## 1. Introducción
En esta unidad convertí mi app web Angular/Ionic en una app nativa Android usando Capacitor. Integré funcionalidades de hardware con plugins nativos: cámara y geolocalización (además de haptics y share como extra).

## 2. Configuración del Entorno (RA4.ce1)
Pasos clave realizados:

- Instalación de Capacitor y plataforma Android.
- Compilación web y sincronización con el proyecto nativo.
- Configuración de permisos en AndroidManifest.xml.

Comandos base:

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
npx cap init
ionic build
ionic cap sync
npx cap add android
```

Permisos en Android (archivo: android/app/src/main/AndroidManifest.xml):

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" android:required="false" />
```

Evidencia recomendada:
- Captura del AndroidManifest donde se vean los permisos.

## 3. Implementación de Plugins (RA4.ce2)
### 3.1 Cámara (PhotoService)
Implementación resumida:

```ts
const capturedPhoto = await Camera.getPhoto({
  resultType: CameraResultType.DataUrl,
  source: CameraSource.Prompt,
  quality: 90
});
this.foto = capturedPhoto.dataUrl;
```

En interfaz, la foto se muestra en el perfil y se actualiza al pulsar el botón de cambiar foto.

### 3.2 Geolocalización (LocationService)
Implementación resumida:

```ts
const coordinates = await Geolocation.getCurrentPosition();
this.latitud = coordinates.coords.latitude;
this.longitud = coordinates.coords.longitude;
```

En interfaz, se muestran coordenadas y un botón para abrir Google Maps con la ubicación.

### 3.3 PWA Elements (obligatorio en navegador)
Registro en el arranque para soportar cámara en web:

```ts
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);
```

## 4. Resolución de Problemas (RA4.ce4)
Problema:
- En Android con Live Reload la app mostraba pantalla en blanco.

Causa:
- Android bloqueaba tráfico HTTP local en modo desarrollo.

Solución:
- Añadí android:usesCleartextTraffic="true" en la etiqueta application del AndroidManifest.
- Ejecuté sync y volví a lanzar la app.

Comandos usados:

```bash
ionic cap sync
ionic cap run android -l --external
```

## 5. Informe de Usabilidad (RA2.ce5)
Prueba en móvil real:

- Visibilidad: en exterior el contraste es aceptable, pero algunos textos secundarios se ven justos.
- Ergonomía: el botón principal es cómodo; algunos elementos pequeños pueden mejorarse.
- Navegación: el botón físico Atrás funciona entre pantallas; revisar cierre de app en pantalla inicial.

Mejoras propuestas (siguiente versión):
- Aumentar tamaño/contraste en textos secundarios.
- Hacer más grandes los objetivos táctiles en acciones frecuentes.

## 6. Evidencias del Despliegue (RA4.ce3)
Evidencias incluidas o a incluir en el blog:

- Captura en móvil/emulador donde se vea la barra de estado Android (hora, batería).
- Captura usando cámara desde la app.
- Captura mostrando coordenadas GPS y botón Ver en mapa.
- (Opcional) Vídeo corto usando cámara + GPS.

## Anexos útiles (comandos de trabajo)

```bash
ionic cap run android
ionic cap run android -l --external
ionic cap sync
ionic cap open android
```

## 7. Reto 6.5 - Checklist de Cumplimiento

### 7.1 Requisitos obligatorios (5 puntos)

- Configuración (RA4.ce1): Cumplido.
- Permisos de cámara y GPS en AndroidManifest: Cumplido (documentar con captura).
- Cámara + visualización en pantalla + PWA Elements: Cumplido.
- GPS + coordenadas + enlace a Google Maps: Cumplido.
- Despliegue Android (emulador/móvil): Cumplido técnicamente por scripts y configuración; falta adjuntar evidencia final de ejecución en dispositivo.
- Blog "Integración Nativa" con estructura 6.4: Cumplido con este documento como base.
- Troubleshooting real (RA4.ce4): Cumplido (caso cleartext).
- Informe de usabilidad (RA2.ce5): Cumplido.

### 7.2 Mejoras para subir nota (rúbrica)

- Plugin extra 1 (para 7): Cumplido.
- Plugin extra 2 (para 10): Cumplido (Haptics + Share).
- Móvil físico obligatorio para >5: Pendiente de evidencia (captura/vídeo en móvil real).
- Iconos personalizados + splash (10): Cumplido en configuración Android.
- Mejora UX aplicada y documentada antes/después (10): Cumplido.

### 7.3 Evidencias mínimas que debes subir al blog

- Captura del AndroidManifest con permisos de cámara y ubicación.
- Captura de la app en Android con barra de estado visible.
- Captura usando cámara desde la app.
- Captura con coordenadas GPS y botón "Ver en mapa".
- (Opcional) Vídeo corto de cámara + GPS en móvil físico.

---
Documento breve para entrada de blog UT6, orientado a evidenciar RA4 (integración nativa) y RA2 (usabilidad).

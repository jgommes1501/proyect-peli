# UT6 - Documentación Integración Nativa

## Plugins Implementados

**Cámara:** Captura de portadas (PhotoService)
```ts
const photo = await Camera.getPhoto({ resultType: CameraResultType.DataUrl });
```

**GPS:** Localización de cines (LocationService)
```ts
const coords = await Geolocation.getCurrentPosition();
```

**PWA Elements:** Soporte web
```ts
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);
```

## Permisos Android

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

## Troubleshooting

**Problema:** Live Reload mostraba pantalla en blanco en Android
**Solución:** Agregar `android:usesCleartextTraffic="true"` en AndroidManifest

## Usabilidad

- ✓ Botones principales accesibles
- ✓ Contraste aceptable en exterior
- ✓ Navegación con botón Atrás funcionando

---

## ✅ Reto 6.5 - Checklist

| Requisito | Estado |
|-----------|--------|
| Configuración Capacitor | ✓ |
| Permisos cámara + GPS | ✓ |
| Cámara funcionando | ✓ |
| GPS + Google Maps link | ✓ |
| Troubleshooting documentado | ✓ |
| Usabilidad evaluada | ✓ |
| PWA Elements | ✓ |
| Plugins extras (Haptics, Share) | ✓ |

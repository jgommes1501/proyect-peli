# 6.3. Despliegue en Android (Android Studio)

Hasta ahora, Capacitor nos permite simular cámara y GPS en navegador. Una app híbrida queda completa cuando se ejecuta como app nativa real en Android.

## Concepto clave: ¿Cómo funciona Capacitor?

Capacitor no ejecuta los archivos TypeScript (`.ts`) en tiempo real dentro de Android. Copia la app web compilada al proyecto nativo.

Flujo base:

1. **Build**: Angular se compila a HTML/JS/CSS (carpeta `www`).
2. **Sync**: `www` se copia al proyecto Android nativo.
3. **Run**: la app se instala en dispositivo/emulador.

---

## Método 1: ejecución estándar (recomendado para probar)

Comando:

```bash
ionic cap run android
```

Qué hace:

- Ejecuta build + sync + instalación en un único paso.
- Muestra una lista para elegir dispositivo físico (USB) o emulador.
- Instala y abre la app en Android.

También disponible como script del proyecto:

```bash
npm run android:run
```

---

## Método 2: Live Reload (recomendado para desarrollar) ⚡

Comando:

```bash
ionic cap run android -l --external
```

Parámetros:

- `-l`: Live Reload. El móvil apunta al servidor de desarrollo y se actualiza al guardar cambios.
- `--external`: expone por IP local para que el móvil acceda por WiFi.

Requisito:

- PC y móvil en la misma red WiFi.

Script equivalente:

```bash
npm run android:live
```

---

## Método 3: abrir Android Studio (trabajo nativo)

Útil para:

- Ver errores nativos en **Logcat**.
- Ajustar SDK/Gradle.
- Generar APK/AAB firmado.

Pasos:

```bash
ionic build
ionic cap sync
ionic cap open android
```

Scripts equivalentes:

```bash
npm run android:prepare
npm run android:open
```

---

## Solución de problemas comunes

- **No detecta el móvil**: activar *Depuración por USB* en opciones de desarrollador.
- **Pantalla en blanco en Live Reload**: Android puede bloquear HTTP.
  - Solución aplicada en este proyecto: `android:usesCleartextTraffic="true"` en `android/app/src/main/AndroidManifest.xml`.

---

## Resumen rápido (chuleta)

| Objetivo | Comando |
|---|---|
| Probar en móvil | `ionic cap run android` |
| Programar rápido (Live Reload) | `ionic cap run android -l --external` |
| Sincronizar cambios nativos | `ionic cap sync` |
| Abrir Android Studio | `ionic cap open android` |

Scripts npm del proyecto:

- `npm run android:run`
- `npm run android:live`
- `npm run android:sync`
- `npm run android:prepare`
- `npm run android:open`

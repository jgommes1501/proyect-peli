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

---

# 7.3 Generando el Ejecutable Firmado (Android App Bundle)

Ya con la app configurada e iconos listos, el formato correcto para publicar en Google Play es un **.aab firmado**.

## APK vs AAB: cambio de estándar

- **APK (Android Package):** incluye todos los recursos para todos los dispositivos e idiomas.
- **AAB (Android App Bundle):** Google Play genera APKs optimizados por dispositivo/idioma.

Desde 2021, Google Play exige subir **AAB** para nuevas publicaciones.

## Paso 1: preparar compilación web en producción

```bash
ionic build --prod
ionic cap sync
ionic cap open android
```

También puedes usar scripts del proyecto:

```bash
npm run android:prepare:prod
npm run android:open
```

## Paso 2: generar bundle firmado en Android Studio

1. Menú **Build > Generate Signed Bundle / APK**.
2. Selecciona **Android App Bundle** y pulsa **Next**.

## Paso 3: crear la Keystore (primera vez) 🔐

En **Key store path**, pulsa **Create new...** y completa:

- **Key store path:** carpeta segura (ej. `Documentos/MisKeys/mi-proyecto-key.jks`).
- **Password:** contraseña robusta.
- **Alias:** identificador de clave (ej. `key0`).
- **Certificate:** al menos `First and Last Name`.

Pulsa **OK** para crear la firma.

⚠️ **ADVERTENCIA CRÍTICA**

Si pierdes el archivo `.jks` o sus contraseñas, no podrás publicar actualizaciones futuras de la app en Google Play con ese paquete.

## Paso 4: generar el archivo final

1. Selecciona la keystore y contraseñas.
2. Pulsa **Next**.
3. Elige variante **release**.
4. Pulsa **Finish**.

Resultado habitual:

- `android/app/release/app-release.aab`

Ese `.aab` es el artefacto final para subir a Google Play Console.

## Integración en tu proyecto personal (evidencias)

- Generar tu propia keystore.
- Guardarla de forma segura.
- Excluirla de Git (`.gitignore`).
- Generar el `.aab` en variante `release`.
- Conservar el `.aab` para la simulación de subida posterior.

## Flujo implementado en este repositorio

1. Crear archivo local de firma (solo una vez):

```bash
npm run android:keystore:init
```

2. Editar `android/signing.properties` con tus credenciales reales y ruta de la keystore.

3. Generar bundle firmado (`release`) con un solo comando:

```bash
npm run android:bundle:release
```

> En PowerShell con políticas restringidas, usa `npm.cmd run android:bundle:release`.

Salida esperada:

- `android/app/build/outputs/bundle/release/app-release.aab`

> Si prefieres desde Android Studio, puedes seguir usando **Build > Generate Signed Bundle / APK**.

# Mejoras para subir nota (Rúbrica)

Fecha: 25/02/2026

## 1) Funcionalidad Extra (RA4.ce2)

Objetivo para **10 (Excelente)**: implementar **2 plugins extra**.

### Plugin extra 1: Haptics

- Estado: **Implementado**
- Dónde se usa:
  - Al validar formulario incompleto (warning) en Home.
  - Al guardar cambios de una película (impacto medio).
  - Al eliminar una película (notificación success).
  - Al mostrar errores (notificación error).

Archivos:

- `src/app/home/home.page.ts`
- `src/app/pages/detalle-tarea/detalle-tarea.page.ts`

### Plugin extra 2: Share

- Estado: **Implementado**
- Qué hace:
  - Permite compartir una película desde el detalle con título, texto y URL de imagen.
- Botón añadido:
  - **Compartir Película** en pantalla de detalle.

Archivos:

- `src/app/pages/detalle-tarea/detalle-tarea.page.ts`
- `src/app/pages/detalle-tarea/detalle-tarea.page.html`

Dependencia añadida:

- `@capacitor/share` (compatible con Capacitor 7)

---

## 2) Despliegue (RA4.ce3)

### Móvil físico (obligatorio para nota > 5)

Pruebas recomendadas en dispositivo Android real:

```bash
npm run android:run
```

Para desarrollo rápido por WiFi:

```bash
npm run android:live
```

### Iconos personalizados y Splash (10 Excelente)

- Estado: **Configurado en Android**
- Cambios aplicados:
  - Color de fondo del icono adaptativo personalizado.
  - Foreground del icono adaptativo apuntando a drawable personalizado.
  - Splash de lanzamiento definido explícitamente en `splash_screen.xml` y enlazado en tema de arranque.

Archivos:

- `android/app/src/main/res/values/ic_launcher_background.xml`
- `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml`
- `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher_round.xml`
- `android/app/src/main/res/drawable/splash_screen.xml`
- `android/app/src/main/res/values/styles.xml`

---

## 3) Usabilidad (RA2.ce5)

Objetivo para **10 (Excelente)**: aplicar al menos una mejora detectada y documentar **antes/después**.

### Mejora aplicada

- Mejora: botón principal **Añadir Película** más visible y fácil de pulsar.

### Antes

- Altura estándar del botón.
- Jerarquía visual menos clara en móviles.

### Después

- Botón con mayor altura (`min-height: 56px`), texto más legible y mayor peso tipográfico.
- Resultado: mejora de accesibilidad táctil y visibilidad de la acción principal.

Archivos:

- `src/app/home/home.page.html`
- `src/app/home/home.page.scss`

---

## Checklist final

- [x] 2 plugins extra integrados (Haptics + Share)
- [x] Comandos de despliegue en Android listos
- [x] Configuración de icono y splash en Android
- [x] Mejora de usabilidad aplicada con antes/después

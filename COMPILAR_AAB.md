# Compilar .aab - Instrucciones Rápidas

## Requisito: Java 11+

1. **Descargar Java 11** → https://adoptium.net/
2. **Instalar** y anotar la ruta (ej: `C:\Program Files\Eclipse Adoptium\jdk-11.0.x`)

## Compilar

```powershell
# Abrir PowerShell en carpeta del proyecto

# Configurar Java
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-11.0.x"

# Generar .aab
npm run android:bundle:release
```

## Resultado

El archivo estará en:
```
android\app\build\outputs\bundle\release\app-release.aab
```

**Listo para entregar en Moodle** ✓

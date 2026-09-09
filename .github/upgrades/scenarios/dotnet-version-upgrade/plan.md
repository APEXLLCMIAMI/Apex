# Plan de Upgrade: .NET Framework 4.7.2 → .NET 10

## 📋 Resumen Ejecutivo

**Objetivo**: Modernizar el proyecto Windows Forms EXAMEN01 de .NET Framework 4.7.2 a .NET 10 (LTS).

**Estado Actual**:
- Framework: .NET Framework 4.7.2
- Tipo de proyecto: Windows Forms (WinExe)
- Formato: Legacy .csproj
- Dependencias: Referencias estándar del framework

**Cambios Requeridos**:
1. Convertir proyecto a formato SDK-style
2. Actualizar target framework a net10.0-windows
3. Resolver incompatibilidades de APIs de Windows Forms
4. Actualizar configuración de aplicación

---

## 🔍 Problemas Identificados

### Críticos (Bloquean el upgrade)
- **Project.0001**: Formato de proyecto debe ser SDK-style
- **Project.0002**: Target framework debe actualizarse
- **Api.0001**: APIs de Windows Forms cambiaron en .NET moderno
- **Api.0002**: System.Configuration.ApplicationSettingsBase no está disponible directamente

### Archivos Afectados
- EXAMEN01.csproj
- Program.cs
- Form1.cs
- Form1.Designer.cs
- Properties/Settings.Designer.cs

---

## 📊 Estrategia de Upgrade

### Fase 1: Preparación (Tareas 1-2)
- ✅ Convertir proyecto a SDK-style
- ✅ Actualizar target framework

### Fase 2: Resolución de Compatibilidad (Tareas 3-5)
- ✅ Actualizar Program.cs (APIs obsoletas)
- ✅ Actualizar Settings (configuración de aplicación)
- ✅ Validar Windows Forms (compatibilidad)

### Fase 3: Validación (Tarea 6)
- ✅ Build completo
- ✅ Pruebas funcionales

---

## 📝 Tareas

### Tarea 1: Convertir proyecto a SDK-style
**Descripción**: Convertir EXAMEN01.csproj del formato legacy al formato SDK-style moderno.

**Subtareas**:
- Usar herramienta convert_project_to_sdk_style
- Validar que el proyecto siga siendo funcional
- Revisar cambios en el archivo .csproj

**Archivos Afectados**: EXAMEN01.csproj

**Done When**:
- [ ] EXAMEN01.csproj en formato SDK-style
- [ ] Proyecto carga sin errores en Visual Studio
- [ ] Estructura del proyecto intacta

---

### Tarea 2: Actualizar target framework a .NET 10
**Descripción**: Cambiar TargetFramework de net472 a net10.0-windows en el .csproj.

**Subtareas**:
- Actualizar elemento <TargetFramework>
- Agregar RID para Windows si es necesario
- Actualizar RuntimeIdentifier

**Archivos Afectados**: EXAMEN01.csproj

**Done When**:
- [ ] TargetFramework = net10.0-windows
- [ ] Proyecto reconoce dependencias de .NET 10
- [ ] IntelliSense actualizado

---

### Tarea 3: Actualizar Program.cs
**Descripción**: Resolver APIs obsoletas en Program.cs (EnableVisualStyles, SetCompatibleTextRenderingDefault, Application.Run).

**Cambios**:
- EnableVisualStyles() — Se mantiene pero puede requerir ajustes
- SetCompatibleTextRenderingDefault() — Obsoleto en .NET moderno, puede eliminarse
- Application.Run() — Se mantiene pero debe validarse

**Archivos Afectados**: Program.cs

**Done When**:
- [ ] No hay errores de compilación en Program.cs
- [ ] APIs llamadas son compatibles con .NET 10
- [ ] Aplicación inicia correctamente

---

### Tarea 4: Resolver Settings y ApplicationSettingsBase
**Descripción**: Actualizar System.Configuration.ApplicationSettingsBase en Properties/Settings.Designer.cs.

**Cambios**:
- Verificar disponibilidad de ApplicationSettingsBase en .NET 10
- Si no está disponible, buscar alternativa o migrar manualmente
- Actualizar namespaces si es necesario

**Archivos Afectados**: Properties/Settings.Designer.cs

**Done When**:
- [ ] Settings compila sin errores
- [ ] ApplicationSettingsBase referenciado correctamente
- [ ] Configuraciones de aplicación funcionan

---

### Tarea 5: Validar Windows Forms
**Descripción**: Verificar que todos los componentes de Windows Forms sean compatibles con .NET 10.

**Componentes a Revisar**:
- Form1.cs y Form1.Designer.cs
- Controles de formulario
- Eventos y propiedades

**Archivos Afectados**: Form1.cs, Form1.Designer.cs

**Done When**:
- [ ] Formulario compila sin errores
- [ ] Diseñador de Windows Forms funciona
- [ ] Eventos están conectados correctamente

---

### Tarea 6: Build y Validación
**Descripción**: Compilar la solución completa y validar que todo funciona correctamente.

**Validaciones**:
- Build completo sin errores
- Build sin advertencias
- Aplicación ejecuta correctamente
- No hay runtime errors

**Done When**:
- [ ] Solución compila sin errores
- [ ] No hay advertencias de compilación
- [ ] Aplicación inicia y funciona
- [ ] Todas las características originales intactas

---

## 🎯 Orden de Ejecución

1. Task-01-Convert-SDK-Style
2. Task-02-Update-TargetFramework
3. Task-03-Update-Program
4. Task-04-Update-Settings
5. Task-05-Validate-WinForms
6. Task-06-Build-Validate

---

## ⚠️ Riesgos y Consideraciones

### Bajo Riesgo
- Windows Forms es totalmente soportado en .NET 10
- No hay dependencias externas complejas
- Proyecto es simple y modular

### Mitigaciones
- Realizar validación step-by-step
- Compilar después de cada cambio
- Revisar errors del AssemblyLoadContext si aparecen

---

## ✅ Criterios de Éxito

- ✅ Proyecto target framework actualizado a net10.0-windows
- ✅ Formato SDK-style aplicado
- ✅ Todas las APIs actualizadas o reemplazadas
- ✅ Solución compila sin errores ni advertencias
- ✅ Aplicación ejecuta correctamente
- ✅ Funcionalidad original preservada


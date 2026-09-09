# 01-convertir-proyecto-a-sdk-style: Convertir proyecto a SDK-style

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

## Research Findings

### Projects Affected
- EXAMEN01\EXAMEN01.csproj — Windows Forms application, currently in legacy format

### Current Project Format
- **Format**: Legacy (non-SDK-style)
- **Root Element**: `<Project ToolsVersion="15.0" xmlns="...">` (not SDK-style)
- **Imports**: Uses explicit `<Import Project="$(MSBuildToolsPath)\Microsoft.CSharp.targets" />`
- **Target Framework**: `<TargetFrameworkVersion>v4.7.2</TargetFrameworkVersion>`
- **Project Type**: WinExe (Windows Forms Application)

### Files Affected by Conversion
- EXAMEN01.csproj — Will be converted to SDK-style format

### Resources (No .resx with embedded images)
- Properties\Resources.resx — Standard Resources file (no embedded images)
- Properties\Settings.settings — Application settings

### Constraints & Considerations
- ✅ No target framework change in this task — only format conversion
- ✅ WinForms project — MSBuild will be needed for `.resx` files
- ✅ No packages.config file — all dependencies managed via explicit References
- ⚠️ Will require SDK-style MSBuild setup for proper .resx resource generation

### Build Tool Decision
- **Tool**: msbuild.exe (VS MSBuild)
- **Reason**: WinForms with .resx files require full MSBuild toolset, not just `dotnet build`

### Decisions Made
1. Use the convert_project_to_sdk_style tool (not manual rewrite)
2. Validate build with msbuild.exe after conversion
3. Ensure no target framework changes during conversion


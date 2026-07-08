Reemplazar la imagen del Servicio 02 "Educación ambiental" en el carrusel de servicios destacados (inicio) y en la página de Servicios.

## Pasos
1. Subir la nueva foto (FOTO.png) como asset Lovable y sobrescribir `src/assets/services/servicio-2.jpg.asset.json` para que apunte al nuevo archivo.
2. Verificar que `src/components/piv-site.tsx` siga importando `servicio2Asset` (no requiere cambios de código, ya que ambas secciones usan la misma referencia).
3. Revisar el `objectPosition` actual de la imagen 2 para asegurar que la persona no se recorte con la nueva foto (ajustar a `center top` si es necesario).

## Detalles técnicos
- `lovable-assets create --file /mnt/user-uploads/FOTO.png --filename servicio-2.jpg > src/assets/services/servicio-2.jpg.asset.json`
- Sin cambios adicionales en rutas ni componentes.
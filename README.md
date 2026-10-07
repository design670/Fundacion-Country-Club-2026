# Fundación Social Country Club de Barranquilla · Sitio web

Proyecto de página web para la Fundación Social Country Club de Barranquilla (antes FundaCountry, 1989).

## Estructura

- **`website/` — Sitio web para entregar al programador** (`index.html`, `css/`, `js/`, `assets/`). Es la versión vigente; ver `website/README.md`.
- `brief/` — Brief estratégico y documento de estructura (sitemap) entregados por la Fundación.
- `prototipo/` — Historial del prototipo en un solo archivo y versiones anteriores. No es la versión para publicar.
- Versión publicada del prototipo: https://claude.ai/artifact/9cHirrXL1wRU7DyCHj4Zfd

## Marca

- Logo: `prototipo/assets/logo.png` (completo, fondo transparente), `logo-simbolo.png` (solo símbolo), `logo-original.png` (el archivo recibido).
- Colores (tomados del logo): azul `#1D4C65`, verde `#279A68`, naranja `#F6A233`.
- Tipografía: Axiforma (Kastelov), en `Font/`. El prototipo usa Regular, Medium, SemiBold, Bold y ExtraBold desde `prototipo/assets/fonts/`.
  - Axiforma es una fuente comercial: confirmar que la licencia de la Fundación cubre uso web antes de publicar el sitio real.

## Decisiones del prototipo

- v4: 11 imágenes generadas con Kling 2.1 (kling-image-v2_1, 2K, estilo foto suave tipo Rylo). Originales PNG sin marca de agua en `imagenes-kling/originales/`; versiones web WebP (1400 px) en `prototipo/assets/img/`. Son referenciales: reemplazar por fotos reales de la Fundación antes de publicar.
- v3: animaciones y estructura según referentes — Higherlife (sección fija con barrido de imágenes y cifras que se relevan, header que se oculta al bajar, parallax), Rylo (tarjetas de 40 px, portada tipo hoja con esquinas redondeadas y fondo generado), EON (menú de pantalla completa con círculo que crece y resorte; botones con círculo que se expande), Virginia Groot (el fondo cambia de color por sección). Las imágenes son visuales generados con las formas del logo hasta tener fotos.
- Ver local: `npx http-server prototipo -p 5178` y abrir http://localhost:5178 (config en `.claude/launch.json`).
- v2: logo, paleta y tipografía oficiales; animaciones (header translúcido al hacer scroll, fundido parejo de fotos en la portada, aparición de secciones al bajar, contadores, efectos al pasar el mouse, carrusel de aliados). Todo respeta "reducir movimiento" del sistema.
- "Proyecto Vivienda Digna" aparecía dos veces en el brief; se unificó en un solo programa (13 programas en total).
- Las fotos son espacios reservados y los formularios no envían datos.
- Los datos pendientes aparecen marcados en amarillo; se ocultan con el interruptor de la barra superior.

## Pendiente por pedir a la Fundación

- Preguntas 9–12: beneficiarios, cifras de impacto, historias y testimonios. Solo hay una cifra confirmada (20 mujeres de Salgar).
- Preguntas 15–25: formas de apoyo a promover, relación con el Country Club, mensajes y acciones clave de la web, información que no debe publicarse, material disponible y referentes.
- Programas de la línea de Gestión ambiental (mencionada, sin programas descritos).
- Lugar donde se desarrolla la Póliza exequial.
- Año en que la Fundación empezó a trabajar con la comunidad.
- Manual de marca (si existe), fotografías y logos de aliados.
- Datos de contacto oficiales, redes sociales y datos para donar (cuenta, pasarela, certificado de donación).
- Documentación: estatutos, certificado de existencia, informes de gestión e impacto, presentaciones.

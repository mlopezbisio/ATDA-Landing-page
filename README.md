# ATDA — Landing

Sitio de la Asociación Civil Tecnológica por el Desarrollo Argentino. Next.js App Router con contenido en Sanity, panel `/admin` y checkout de cursos con **MODO** (botón / QR, procesado por Decidir Plus / Payway).

## Desarrollo local

1. Copiá `.env.example` a `.env.local` y completá las claves.
2. `npm install`
3. `npm run dev`

El Studio de Sanity es una app aparte, en la carpeta hermana `../studio-pagina-web` (proyecto `t61vrots`, dataset `production`). No está embebido en Next.js.

```powershell
cd ..\studio-pagina-web
npm run dev
```

Abre [http://localhost:3333](http://localhost:3333). Desde ahí cargás landing, áreas, actividad, red, cursos e inscripciones.

Sin contenido en Sanity la landing usa textos de respaldo. Áreas, actividad, red y cursos solo se muestran cuando hay documentos publicados.

## Flujo de Git

Ver [CONTRIBUTING.md](CONTRIBUTING.md). Resumen: ramas `feat/*` y `fix/*` desde `develop`, PR a `develop`, release con PR `develop` → `main`.

## Panel de administración

`/admin` — ingreso con Google. Solo mails listados en `ADMIN_EMAILS`. El aula virtual de cada inscripción se asigna a mano; el panel solo marca el acceso como concedido.

## Pagos MODO

1. Alta Payway → Payway Ventas Online (Decidir Plus).
2. Formulario MODO empresa con Site ID + API keys → recibís `MODO_USERNAME`, `MODO_PASSWORD`, `MODO_STORE_ID` y códigos (`MODO_PROCESSOR_CODE`, `MODO_CC_CODE`).
3. Checkout: `POST /api/checkout/modo` crea la inscripción y el payment request; el usuario ve QR / deeplink en `/checkout/modo/[id]`.
4. Webhook: `POST /api/webhooks/modo` (exponé la URL pública con ngrok en local).

## Webhooks

- Sanity: `POST /api/webhooks/sanity` (revalida la landing).
- MODO: `POST /api/webhooks/modo`

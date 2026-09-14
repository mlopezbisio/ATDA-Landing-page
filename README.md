# ATDA — Landing

Sitio de la Asociación Civil Tecnológica por el Desarrollo Argentino. Next.js App Router con contenido en Sanity, panel `/admin` y checkout de cursos (Mercado Pago + TaloPay).

## Desarrollo local

1. Copiá `.env.example` a `.env.local` y completá las claves.
2. `npm install`
3. `npm run dev`

Sin Sanity configurado la landing igual arranca con el contenido de respaldo. Las secciones Áreas, Actividad, Red y Cursos solo se muestran cuando hay documentos publicados en Sanity.

## Flujo de Git

Ver [CONTRIBUTING.md](CONTRIBUTING.md). Resumen: ramas `feat/*` y `fix/*` desde `develop`, PR a `develop`, release con PR `develop` → `main`.

## Panel de administración

`/admin` — ingreso con Google. Solo mails listados en `ADMIN_EMAILS`. El aula virtual de cada inscripción se asigna a mano; el panel solo marca el acceso como concedido.

## Webhooks

- Sanity: `POST /api/webhooks/sanity` (revalida la landing).
- Mercado Pago: `POST /api/webhooks/mercadopago`
- TaloPay: `POST /api/webhooks/talo`

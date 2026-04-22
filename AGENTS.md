<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Shapermint design system (repo)

- Código, tokens, fuentes, previews y `ui_kits/`: directorio `shapermint-design-system/`.
- Los colores, tipografía y escala viven en `shapermint-design-system/colors_and_type.css` (importado en `src/styles/globals.css` → variables CSS `--ink-*`, `--coral-*`, `--space-*`, etc.).
- En TypeScript, alias de importación: `@shapermint/*` → `./shapermint-design-system/*` (p. ej. `import x from "@shapermint/assets/logos/shapermint-logo.svg"`).
- Documentación de marca, voz y buenas prácticas: `shapermint-design-system/README.md`. Para agentes, ver también `shapermint-design-system/SKILL.md` si aplica el flujo en Cursor/Claude.

## Git: una rama por landing

- Cada landing nueva se desarrolla en **su propia rama** a partir de la rama base acordada (p. ej. `main`).
- Nombre sugerido: `landing/<slug>` (ej. `landing/empetua-hero-2026`).
- Integrar en la rama base con **pull request** cuando la landing esté lista para revisión o publicación.

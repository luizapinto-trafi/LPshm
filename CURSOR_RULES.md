# Cursor Rules — SHM Landing Pages Design Lab

## Shapermint design system

- Fuentes, variables de color, espaciado, radios y sombras: usar el archivo ya importado en `src/styles/globals.css` (`shapermint-design-system/colors_and_type.css` — p. ej. `var(--coral-500)`, `var(--space-400)`).
- Para imágenes y SVGS compartidos del pack: preferir el alias `@shapermint/...` (ruta en `shapermint-design-system/`). Ver `shapermint-design-system/README.md` para la escala estricta de espacios, radios y voz de marca.
- **No** introducir modo oscuro a nivel de página: el DS es solo claros; `globals.css` fija `color-scheme: only light` coherente con el README del DS.

## Styled Components
- All styled component variables **must** be prefixed with `Styled` (e.g. `StyledContainer`, `StyledHeading`).
- Do not use `className` for layout or theming — compose with styled components instead.

## Component Authoring
- Use **arrow-function components with named exports**.

  ```tsx
  // ✅
  export const HeroSection = () => { ... };

  // ❌
  export default function HeroSection() { ... }
  ```

- One component per file; file name matches the export name.

## Internationalisation (i18n)
- **All user-facing strings** — including image `alt` attributes, `aria-label`, and `title` — must go through `t()` from `useTranslation`.

  ```tsx
  const { t } = useTranslation("common");
  <img src={src} alt={t("hero.imageAlt")} />
  ```

- Add every key to `public/locales/en/common.json` (and mirror in `src/i18n/locales/`).

## Data Fetching
- Use **`useSWR`** for all data fetching — never `fetch` inside `useEffect`.

  ```tsx
  // ✅
  const { data } = useSWR("/api/products", fetcher);

  // ❌
  useEffect(() => { fetch("/api/products").then(...) }, []);
  ```

## Keyboard Accessibility
- Use the shared `handleKeyDown` utility (`@/shared/utils/KeyEvent`) for all `onKeyDown` handlers on interactive elements.

  ```tsx
  import { handleKeyDown } from "@/shared/utils/KeyEvent";

  <div
    role="button"
    tabIndex={0}
    onClick={onSelect}
    onKeyDown={(e) => handleKeyDown(e, onSelect, ["Enter", " "])}
  />
  ```

## TypeScript Patterns
- **No `enum`s** — use `as const` maps instead.

  ```ts
  // ✅
  export const Direction = { Up: "up", Down: "down" } as const;
  export type Direction = (typeof Direction)[keyof typeof Direction];

  // ❌
  enum Direction { Up = "up", Down = "down" }
  ```

## React Performance Hooks
- **Avoid `useMemo`, `useCallback`, and `useEffect`** unless there is a measurable, documented reason.
- If you add one, leave a comment explaining the specific constraint that requires it.

## Banned Dependencies
Do **not** install or import any of the following:
- `@tanstack/react-query`
- `tailwindcss`
- `@emotion/react` / `@emotion/styled`
- `@mui/material` (Material UI)
- `@chakra-ui/react` (Chakra)
- Any other UI component library not explicitly approved

## Package Manager
- Use **Yarn** (`yarn add`, not `npm install`).

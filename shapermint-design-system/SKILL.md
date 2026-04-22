---
name: shapermint-design
description: Use this skill to generate well-branded interfaces and assets for Shapermint (a Trafilea shapewear brand), either for production or throwaway prototypes/mocks/decks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files (`colors_and_type.css`, `fonts/`, `assets/`, `preview/`, `ui_kits/website/`, `ui_kits/mobile/`).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. Link `colors_and_type.css` for tokens; copy logo, product, and lifestyle images from `assets/`; pull components from `ui_kits/website/components.jsx` or `ui_kits/mobile/app.jsx` when building high-fidelity screens.

If working on production code, copy assets and read the rules in `README.md` (Content Fundamentals, Visual Foundations, Iconography) to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions (e.g. surface — web or mobile; single screen or full flow; production or throwaway mock; what does it need to communicate), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Flagged substitutions to respect:
- "Avenir Next" is currently aliased to the Avenir Next LT Pro OTF files (the only fonts provided). Metrics differ slightly; use LT Pro for display and Next for body, both via the tokens in `colors_and_type.css`.
- Iconography uses a small Lucide-style stand-in. The Figma source has a bespoke 250+ SVG set — if working on production surfaces, import the real SVGs from Figma instead.

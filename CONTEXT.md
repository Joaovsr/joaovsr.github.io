# Project Language

Terms used across this codebase. Keep this file synced when new concepts crystallize during architecture work.

## Domain entities

The portfolio surfaces a fixed set of entity kinds: **Experience**, **Project**, **Education**, **Certification**, **Skill**, **Profile**, **RagQuestion** (the RAG demo).

## Slug

Stable string identifier for an instance of an entity. Examples: `fictor` (an Experience), `super_app` (a Project), `estacio` (an Education).

- Lowercase, snake_case where multi-word.
- Unique within an entity kind, not globally.
- Doubles as the Vue `v-for` `:key` and as the address into the localized content seam.

## Localized content seam

All translatable text lives in `src/locales/<locale>.json`. Entity content is addressed by convention: `<entity>.<slug>.<field>`.

```
experience.fictor.role
experience.fictor.description
projects.super_app.description
education.estacio.degree
```

Consequences:

- `src/data/*.ts` files describe **structure only** (slug, dates, technology tags, urls, status). No `Record<string, string>` fields, no localized text.
- Templates and the PDF renderer call `t(\`experience.${exp.slug}.role\`)` directly. No wrapper composable.
- vue-i18n handles fallback (configured to `pt-BR`).

Exception: the RAG demo (`src/data/ragDemo.ts`) carries explicit i18n keys on its data (`questionKey`, `answerKey`, etc.) instead of using the slug convention. Its structure makes per-chunk keys natural; the convention isn't a fit. Left as-is on purpose.

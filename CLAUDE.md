# Vax Gap

Prototype for UK clinicians planning catch-up vaccines for children and adults with missing or incomplete records. Not for clinical use.

## Setup

- Everything lives in `index.html`: markup, styles and scripts. No build step.
- Hosted on GitHub Pages from `main` at https://vaxgap.danwalker.site (see `CNAME`). Pushing to `main` deploys.
- The hero photo and handout translations are embedded in `index.html` as a data URI and a JSON object (`HANDOUT_STRINGS`). Sources are in `assets/`.
- Run `npm install` then `npm test` for the rule tests (jsdom). They print plans for nurse-supplied cases; check output by eye after rule changes.

## Clinical rules

- Follow UKHSA: the complete routine schedule and the algorithm for uncertain or incomplete immunisation status.
- Dates are UTC midnight timestamps. The day a dose is given is day 0, so a 4 week gap means the next dose is due on day 28, never earlier.
- School programmes go by school year (1 September start), not birthday.
- MenB 2026 offer: ask which brand (Bexsero or Trumenba) and dose dates; brands aren't interchangeable.
- Other vaccines (often from abroad) are entered as dated doses from the `ABROAD` list and judged in `abroadInfo()`. A 6-in-1 or Td/IPV dose needs diphtheria, tetanus and polio on the same day; OPV only counts before April 2016. Measles only, MR and any measles dose before age 1 don't count. Live vaccines push MMR or MMRV 4 weeks later.
- Flag anything that conflicts with UKHSA guidance rather than silently changing it.

## Design

- Dan is a UX designer. Keep GOV.UK patterns for forms, errors and links. Yellow app bar (#FFB320), ink navy (#14233F), grey page (#ECEFF3), white cards.
- Desktop: top nav (Home, About, Updates, Vaccine Checker button). Mobile: bottom tabs (Home, Checker, About, Updates). The Schedule page and More menu are hidden for now; their code is still in `index.html`.
- Check changes at desktop (1280) and phone (375) widths before pushing.
- Copy: short, plain, UK English, no dashes.

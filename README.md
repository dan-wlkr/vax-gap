# Vax Gap

A prototype for clinicians planning catch-up vaccines for children and adults whose records are missing or incomplete, such as people who have just arrived in the UK.

Prototype only. Not for clinical use.

## What it does

- Takes a date of birth and whatever vaccine records the patient has
- Works out what to give today, what to give at later visits and what comes later through school or age-based programmes
- Follows UKHSA guidance, including the MMRV changes, the chickenpox catch-up and the 2026 MenB offer
- Gives notes to copy into the record and a patient handout in 18 languages

## Running it

It's a single page with no build step.

- Open `index.html` in a browser, or
- Run `npm run serve` and open the address it shows

## Tests

```
npm install
npm test
```

The tests run nurse-supplied cases through the scheduling rules and print the plan for each one.

## Structure

- `index.html`: the whole app (markup, styles and scripts). The hero photo and handout translations are embedded so it works offline.
- `assets/hero.jpg`: source of the home page photo
- `assets/handout-strings.json`: source of the handout sentences in each language. Drafts, not yet checked by a translator.
- `tests/rules.test.js`: rule tests

## Sources

- UKHSA, Complete routine immunisation schedule
- UKHSA, Vaccination of individuals with uncertain or incomplete immunisation status

## Hosting

Served from GitHub Pages (Settings, Pages, deploy from the `main` branch, root folder). The page has a `noindex` tag so search engines leave it out.

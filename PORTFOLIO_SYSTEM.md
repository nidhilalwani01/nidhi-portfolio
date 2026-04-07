# Portfolio System Guide (GitHub Pages)

This guide defines a scalable structure for a plain HTML/CSS/JavaScript portfolio.

## 1) Folder Structure

Use this structure as your default:

```text
/
  index.html
  style.css
  script.js
  PORTFOLIO_SYSTEM.md
  img/
    logos/
    projects/
      health-bank-one/
      intel-timeline/
      intel-dashboard/
      nasa-data-explorer/
      drop-for-change/
  projects/
    project-template.html
    health-bank-one.html
    intel-timeline.html
    intel-dashboard.html
    nasa-data-explorer.html
    drop-for-change.html
```

Notes:
- You can keep existing image paths for now.
- For future projects, add image assets under `img/projects/<project-slug>/`.

## 2) Naming Conventions

Use kebab-case everywhere for consistency.

### Project pages
- `projects/<project-slug>.html`
- Examples:
  - `projects/health-bank-one.html`
  - `projects/nasa-data-explorer.html`

### Image files
- `img/projects/<project-slug>/<project-slug>-<type>-<index>.<ext>`
- Examples:
  - `img/projects/health-bank-one/health-bank-one-hero-01.png`
  - `img/projects/health-bank-one/health-bank-one-screen-02.png`
  - `img/projects/drop-for-change/drop-for-change-demo-01.gif`

### Link IDs and anchors
- section IDs in kebab-case: `#design-process`, `#final-outcome`

## 3) Homepage Card System (Repeatable)

In `index.html`, duplicate one full `project-card` block and edit:
- `href` to the new project page
- image `src` and `alt`
- year/title/summary/tags

Keep existing class names unchanged to preserve styling and accessibility.

## 4) Project Detail Template System (Repeatable)

Use `projects/project-template.html` as the source of truth.

For each new project:
1. Duplicate `project-template.html`.
2. Rename to `projects/<project-slug>.html`.
3. Replace hero text and project metadata.
4. Replace media placeholders.
5. Fill only the links that exist by setting `data-url` values.
6. Keep section IDs and base structure for consistency.

## 5) Link Strategy (Maintainable)

Use relative links only:
- Homepage to project: `projects/<project-slug>.html`
- Project to homepage: `../index.html`
- Project to projects section: `../index.html#projects`
- Project images: `../img/...`

## 6) Content Checklist for New Projects

Before publishing a new project:
- Homepage card added and tested.
- Project page created from template.
- Featured image + screenshot/mockup gallery updated.
- Optional video embed updated or removed.
- Top action button group updated (`data-url` values).
- Footer year and nav links still working.
- Mobile layout checked.

## 7) Keep It Maintainable

- Reuse shared CSS in `style.css`. Avoid page-specific inline styles.
- Reuse shared JavaScript patterns (button visibility via `data-url`).
- Keep one source template (`projects/project-template.html`) up to date.
- Prefer small, consistent updates over one-off custom structures.

## 8) Optional Next Step (when you are ready)

If your project count grows beyond 12-15 items, move homepage cards to a simple data-driven render in JavaScript (array of project objects) so you update content in one place only.

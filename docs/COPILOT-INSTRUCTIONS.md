# JBTradesmenLLC Copilot Instructions

## Project Philosophy

This website is intended to feel like a premium regional contractor with the polish of a national company.

Every change should improve the existing website.

Do NOT redesign unless specifically instructed.

When uncertain:

- Preserve.
- Improve.
- Refine.
- Never replace without approval.

---

# Design Authority

The following documents are the source of truth.

Read these before making any code changes.

docs/BRAND.md

docs/DESIGN-RULES.md

docs/PROJECT.md

docs/ROADMAP.md

Reference Images:

docs/reference-assets/

Always compare new work against the supplied reference images.

Never redesign from memory.

---

# Workflow

Before editing code:

1. Read all project documentation.
2. Explain what files will change.
3. Explain why.
4. Wait for approval.

Never immediately modify the project.

---

# Change Scope

Unless specifically instructed:

Do NOT modify:

- Navbar
- Footer
- Reviews
- Featured Projects
- Gallery
- Routing
- Contact Forms
- Existing Components

Only modify the section requested.

---

# UI Principles

Maintain:

- Premium appearance
- Clean spacing
- Strong typography
- High contrast
- Consistent gold accent color
- Dark luxury appearance
- Large photography
- Minimal clutter

Avoid:

- Generic templates
- Rounded cartoon styling
- Bright colors
- Oversized icons
- Unnecessary animations

Every section should feel intentional.

---

# Branding

Company:

JBTradesmenLLC

Brand Colors:

Gold
Black
White
Dark Gray

Brand personality:

Professional

Dependable

Experienced

Premium

Responsive

Never make the website feel like a budget handyman company.

---

# Logo Rules

Never recreate or redesign the logo.

Never stretch the logo.

Never recolor the logo.

Always use the supplied logo asset.

Maintain clear space around the logo.

---

# Photography

Photography should prioritize:

Commercial maintenance

Residential remodeling

Property management

Banks

Retail

Professional technicians

Milwaukee tools

Luxury residential interiors

Modern commercial spaces

Avoid:

Low quality stock images

Obvious AI artifacts

Cartoon-looking imagery

Busy backgrounds

---

# Components

Prefer improving existing components.

Do not create duplicate components.

Reuse code whenever possible.

Keep component structure clean.

---

# CSS

Prefer editing existing CSS.

Avoid unnecessary new stylesheets.

Keep naming consistent.

Remove unused styles.

---

# TypeScript

Maintain strict typing.

Avoid "any".

Keep interfaces organized.

Avoid duplicate data.

---

# Performance

Minimize new dependencies.

Optimize images.

Keep builds clean.

Avoid unnecessary renders.

---

# Accessibility

Maintain accessibility.

Proper heading hierarchy.

Alt text.

Keyboard navigation.

Readable contrast.

---

# Responsive Design

Desktop first.

Then tablet.

Then mobile.

Do not sacrifice desktop quality.

---

# Git Philosophy

Small commits.

Small changes.

One feature at a time.

Never perform massive project-wide refactors unless requested.

---

# Before Every Task

Think first.

Compare with existing implementation.

Read project documentation.

Review reference images.

Determine the minimum number of files required.

Explain the plan.

Wait for approval.

Only then write code.

---

# Definition of Success

A successful task:

Changes only what was requested.

Matches the reference design.

Maintains brand consistency.

Keeps the project clean.

Compiles successfully.

Does not introduce regressions.

Improves quality.

Uses the fewest necessary edits.

```

---

## One more thing I'd add

As your project grows, you'll probably have 50–100 React components. One simple rule can save a surprising amount of time and tokens:

```markdown
# Existing Code First

Before creating a new component, always search the project for an existing component that can be reused or extended.

Do not duplicate functionality.

Favor extending existing code over creating new files.

Only create a new component when reuse would make the code less maintainable.
```

I also recommend adding one final instruction at the very bottom:

```markdown
When multiple implementation options exist, recommend the one that results in the smallest, cleanest, and most maintainable code change rather than the fastest implementation.
```

Those two additions encourage Copilot to make focused, incremental edits instead of broad rewrites, which should help you stay within your remaining credits while keeping the codebase consistent.
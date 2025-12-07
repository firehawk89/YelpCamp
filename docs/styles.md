# Design System

## Table of Contents

- [Colors](#colors)
- [Typography](#typography)
- [Shadows & Blurs](#shadows--blurs)
- [Spacing](#spacing)
- [Grids](#grids)

## Colors

All color palettes are available as standard Tailwind utilities (e.g., `bg-primary-500`, `text-secondary-base`, `border-error-100`).

### Primary

**Token:** `primary`
**Shades:** `50`, `75`, `100`–`900`, `base` (alias for `400`)
**Description:** Foundation for consistent and visually appealing interactive elements across the UI. Used for CTAs, links, and active states.

### Secondary

**Token:** `secondary`
**Shades:** `50`, `75`, `100`–`900`, `base` (alias for `400`)
**Description:** Supportive colors creating a sense of calmness. Used for secondary text and backgrounds.

### Success

**Token:** `success`
**Shades:** `50`, `75`, `100`–`900`, `base` (alias for `400`)
**Description:** Indicates success or celebration. Used for lozenges, badges, toggles, and positive messages.

### Neutral

**Token:** `neutral`
**Shades:** `50`, `75`, `100`–`900`, `base` (alias for `400`)
**Description:** System foundation for text, form fields, backgrounds, and dividers.

### Warning

**Token:** `warning`
**Shades:** `50`, `75`, `100`–`900`, `base` (alias for `400`)
**Description:** Draws attention to important information or non-blocking states.

### Error

**Token:** `error` (aliased as `danger`)
**Shades:** `50`, `75`, `100`–`900`, `base` (alias for `400`)
**Description:** Indicates destructive actions, blocking workflows, or error messages.

### Brown

**Token:** `brown`
**Shades:** `50`, `75`, `100`–`900`, `base` (alias for `400`)
**Description:** Foundation color for specific thematic elements.

### Shades

**Tokens:** `shades-white`, `shades-black`
**Description:** Pure black and white values.

## Typography

Font family: **Inter**. All styles fit the 4px grid.

### Headings

- **Display Large**: `text-display-lg` (56px, -4% spacing)
- **Display Small**: `text-display-sm` (48px, -4% spacing)
- **H1**: `text-h1` (40px, -4% spacing)
- **H2**: `text-h2` (36px, -4% spacing)
- **H3**: `text-h3` (32px, -2% spacing)
- **H4**: `text-h4` (28px, -2% spacing)
- **H5**: `text-h5` (24px, -2% spacing)
- **H6**: `text-h6` (20px, -2% spacing)

All headings support Regular, Medium, SemiBold, and Bold weights.

### Paragraphs

- **Large**: `text-paragraph-lg` (18px)
- **Medium**: `text-paragraph-md` (16px)
- **Small**: `text-paragraph-sm` (14px)
- **XSmall**: `text-paragraph-xs` (12px)

All paragraphs use 145% line height and 0% spacing. Support all weights.

### Captions

- **Large**: `text-caption-lg` (14px, 12% spacing)
- **Small**: `text-caption-sm` (12px, 12% spacing)
- **XSmall**: `text-caption-xs` (10px, 16% spacing)

All captions use 120% line height and are SemiBold by default.

## Shadows & Blurs

Visual elements to bring depth, hierarchy, and focus.

### Shadows (Soft)

Use `shadow-soft-*` classes.

- **Sizes**: `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`
- **Description**: Subtle shadows for depth.

### Shadows (Hard)

Use `shadow-hard-*` classes.

- **Sizes**: `xxs`, `xs`, `sm`, `md`
- **Description**: Higher contrast shadows for emphasis.

### Blurs

Use `blur-*` classes.

- **Sizes**: `xsmall` (2px), `small` (4px), `medium` (8px), `large` (12px), `xlarge` (16px)
- **Description**: Soften edges or highlight content.

## Spacing

Comprehensive spacing system proportional to a 4px scale.

- **Tokens**: `1` (4px), `2` (8px), `3` (12px), `4` (16px), `5` (20px), `6` (24px), `7` (28px), `8` (32px), `10` (40px), `12` (48px), `16` (64px), `20` (80px), `24` (96px), `32` (128px), `40` (160px), `48` (192px).

## Grids

Layout grid options fitting various screens.

### Small (320px - 599px)

- **Margin**: 16px (Token: `container-padding-sm`)
- **Gutter**: 12px
- **Columns**: 4 or 6

### Medium (600px - 1135px)

- **Breakpoint**: `md` (600px)
- **Margin**: 32px (Token: `container-padding-md`)
- **Gutter**: 20px
- **Columns**: 6 or 8

### Large (1136px & Larger)

- **Breakpoint**: `lg` (1136px)
- **Margin**: 112px (Token: `container-padding-lg`)
- **Gutter**: 32px
- **Columns**: 12

### Fluid Container

- **Margin**: 24px (Token: `container-padding-default`)
- **Gutter**: 24px
- **Columns**: 12 (auto)

# Interface Design System
> Last updated: 2026-04-25

---

## Direction & Feel

Two distinct UI contexts built in this project. Each has its own established system.

---

## Settings Panel (`settings-panel.html`)

**Feel:** Precision instrument — cool, calibrated, authoritative. Like a well-organized control room. No decoration, every element earns its place.

**Who:** Power user configuring their tool. Methodical, deliberate, not urgent.

### Tokens

```css
--console:     #0e1014;   /* page base */
--panel:       #141519;   /* main surfaces */
--plate:       #1b1d24;   /* groups, cards */
--layer:       #22252e;   /* inputs, top surfaces */

--dial:        #6b8cba;   /* slate blue accent — IDE cursor precision */
--dial-dim:    rgba(107,140,186,.13);
--dial-glow:   rgba(107,140,186,.06);

--readout:       rgba(255,255,255,.90);
--readout-2:     rgba(255,255,255,.54);
--readout-3:     rgba(255,255,255,.30);
--readout-muted: rgba(255,255,255,.14);

--circuit:      rgba(255,255,255,.07);
--circuit-soft: rgba(255,255,255,.04);
--circuit-em:   rgba(255,255,255,.14);

--ok:    #4e9e6e;
--warn:  #c9803a;
--error: #c94a4a;
```

### Depth Strategy
**Borders-only.** No shadows. Every boundary is earned, none decorative.
- Standard: `--circuit` (rgba .07)
- Soft separator: `--circuit-soft` (rgba .04)
- Emphasis: `--circuit-em` (rgba .14)

### Spacing
Base unit: **8px**. Denser than consumer apps — suits configuration contexts.

### Border Radius
```
--r-xs: 3px   (tags, badges)
--r-sm: 5px   (inputs, buttons, selects)
--r-md: 8px   (nav items, hover targets)
--r-lg: 11px  (groups, cards)
```

### Typography
- **UI:** DM Sans (functional, zero personality — lets controls speak)
- **Monospace:** DM Mono (values, versions, shortcuts, code)
- No display typeface — everything is utility

### Component Patterns

**Setting Row:**
- Label col (flex: 1): bold name 13px + muted desc 11px below
- Control (flex-shrink: 0): right-aligned
- Hover: `rgba(255,255,255,.02)` — barely perceptible
- Separator between rows: `--circuit-soft`

**Group:**
- Background: `--plate`
- Border: `--circuit`
- Radius: `--r-lg`
- Label bar: 10px uppercase, letter-spacing .09em, `--readout-3`

**Toggle:**
- Track: 36×20px, radius 100px
- Thumb: 14×14px, offset 3px
- Off state: `--layer` track + `--circuit-em` border
- On state: `--dial` track, white thumb, translate 16px

**Dark mode preview cards:**
- 80×54px miniature mockups (light / dark / system)
- System: diagonal clip-path split, `rotate(4deg)` divider
- Selected: 2px `--dial` border

**Nav item active state:** `--dial-dim` background + `--dial` text/icon

**Danger zone:**
- Background: `rgba(201,74,74,.04)`
- Border: `rgba(201,74,74,.15)`
- Label color: `rgba(201,74,74,.6)`
- Button: ghost with red border, fills on hover

---

## Music Dashboard (`music-dashboard.html`)

**Feel:** Vinyl listening room at night — dark, warm, unhurried. The music leads.

**Who:** Listener discovering or managing what they play. Personal, taste-conscious.

### Tokens

```css
--vinyl:       #0c0c0e;   /* page base — concert hall dark */
--groove:      #131316;   /* nav, queue panel */
--sleeve:      #1a1a1e;   /* cards, hover */
--layer:       #212126;   /* top surfaces */

--needle:      #e09a3e;   /* amber — record store incandescent */
--needle-dim:  rgba(224,154,62,.14);
--needle-glow: rgba(224,154,62,.07);

--liner:       rgba(255,255,255,.92);
--liner-2:     rgba(255,255,255,.58);
--liner-3:     rgba(255,255,255,.32);
--liner-muted: rgba(255,255,255,.16);

--wire:        rgba(255,255,255,.07);
--wire-soft:   rgba(255,255,255,.04);
--wire-em:     rgba(255,255,255,.13);
```

### Depth Strategy
**Borders-only.** Warm surfaces — same hue shift, never different hues.

### Spacing
Base unit: **8px**. Medium density — not sparse, not overwhelming.

### Border Radius
```
--r-sm: 6px   (track thumbnails, tags)
--r-md: 10px  (nav items, track rows)
--r-lg: 14px  (stat cards)
--r-xl: 20px  (album art)
```

### Typography
- **UI:** DM Sans
- **Display:** Playfair Display (track title, top genre value) — editorial presence, liner notes feel
- Track title: 26px, weight 600, letter-spacing -0.01em
- Stats value: 30px, weight 300, tabular-nums

### Component Patterns

**Album art:**
- 188×188px, radius `--r-xl`
- 4-block color grid (simulates album cover)
- Warm glow beneath: `--needle` color, opacity .22, blur 18px, positioned below art

**Now Playing stage:**
- Player leads the page (not bottom bar)
- 2-col grid: art (188px) + track info
- Track info: label → title (Playfair) → artist → chips → progress → controls

**Progress bar:**
- Height: 2px, `--wire-em` track
- Fill: `--needle`, thumb appears on `.progress-bar:hover`

**Play button:**
- 44×44px circle, `--needle` background, dark icon
- Flanked by 34px ghost controls

**Stat cards:**
- `--sleeve` background, `--circuit` border
- 3-col grid, value in light weight (300) for numeric contrast
- Genre value uses Playfair Display (editorial treatment)

**Queue panel:**
- 268px right panel, `--groove` background
- Section labels: 9px uppercase, `--readout-muted`
- Items: 34px thumb + title/artist + duration

---

## Shared Principles

- **Depth:** Borders-only across both systems. No shadows.
- **Surfaces:** Same hue, shift lightness only. Never different hues between surfaces.
- **Borders:** Low-opacity rgba — findable when needed, invisible otherwise.
- **Color as meaning:** Single accent per system, used with intention only.
- **Spacing:** 8px base unit throughout.
- **Inputs:** Slightly darker than surroundings (`--layer`) — "inset" signal.
- **Navigation:** Same background as content with border separation (no color fragmentation).

# A.M.A.T.S. Design Specification
## A.I. Monitoring for Alertness, Tiredness and Safety

---

## 📋 Overview

This document contains the complete design specification for the A.M.A.T.S. (A.I. Monitoring for Alertness, Tiredness and Safety) system. Use this as a reference to modify, enhance, or rebuild the interface.

---

## 🎨 Design System

### Color Palette

#### Light Theme
```css
Primary: #030213 (Dark Navy)
Background: #ffffff (White)
Card Background: #ffffff (White)
Secondary: #f1f2f6 (Light Gray)
Muted: #ececf0 (Light Gray)
Muted Text: #717182 (Gray)
Accent: #e9ebef (Light Blue-Gray)
Border: rgba(0, 0, 0, 0.1) (10% Black)
Success: #22c55e (Green)
Warning: #f59e0b (Orange)
Danger: #d4183d (Red)
```

#### Dark Theme
```css
Primary: #ffffff (White)
Background: #0a0a0f (Very Dark Navy)
Card Background: #0a0a0f (Very Dark Navy)
Secondary: #1a1a1f (Dark Gray)
Muted: #1a1a1f (Dark Gray)
Muted Text: #9ca3af (Light Gray)
Border: #1a1a1f (Dark Gray)
```

### Typography

#### Font Sizes
- **Base**: 16px
- **H1**: 2xl (32px) - Main headings
- **H2**: xl (24px) - Section headings
- **H3**: lg (20px) - Subsection headings
- **H4**: base (16px) - Card titles
- **Body**: base (16px) - Regular text
- **Small**: sm (14px) - Captions, labels
- **Tiny**: xs (12px) - Fine print

#### Font Weights
- **Medium**: 500 - Headings, buttons, labels
- **Normal**: 400 - Body text, inputs

### Spacing & Sizing

#### Border Radius
- **Default**: 10px (0.625rem)
- **Small**: 6px
- **Large**: 14px
- **Extra Large**: 18px

#### Spacing Scale
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px

---

## 🏗️ Layout Structure

### Main Layout
```
┌─────────────────────────────────────────┐
│                 HEADER                   │
│ [Logo + Title] [System Status + Badge]  │
├─────────────────────────────────────────┤
│                                         │
│              NAVIGATION TABS            │
│    [Monitor] [Stats] [Shop] [Settings]  │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│              MAIN CONTENT               │
│            (Tab Content Area)           │
│                                         │
│                                         │
└─────────────────────────────────────────┘
│                 FOOTER                   │
│     [Copyright] [Safety Message]        │
└─────────────────────────────────────────┘
```

### Container Specifications
- **Max Width**: Container-based (responsive)
- **Horizontal Padding**: 16px (px-4)
- **Vertical Padding**: 24px (py-6)

---

## 🎯 Component Specifications

### Header Component
```
Height: Auto (py-4)
Background: Card background with border-bottom
Layout: Flex justify-between

Left Section:
├── Logo Container (p-2, bg-primary, rounded-lg)
│   └── Eye Icon (h-6 w-6, primary-foreground color)
├── Title Section
│   ├── Main Title: "A.M.A.T.S." (text-2xl, font-semibold)
│   └── Subtitle: "A.I. Monitoring for..." (text-sm, muted-foreground)

Right Section:
├── Status Indicator
│   ├── Green Dot (w-2 h-2, bg-green-500, animate-pulse)
│   └── "System Active" Text (text-sm)
└── Security Badge
    ├── Shield Icon (h-3 w-3)
    └── "Secure" Text
```

### Navigation Tabs
```
Layout: Grid 4 columns on large screens, full width on mobile
Each Tab:
├── Icon (h-4 w-4)
├── Full Text (hidden on small screens)
└── Short Text (visible on small screens only)

Tab States:
├── Default: Muted colors
├── Active: Primary colors, highlighted
└── Hover: Subtle accent background
```

### Card Components
```
Standard Card:
├── Background: Card background
├── Border: Subtle border
├── Radius: Default (10px)
├── Padding: p-6
├── Shadow: Subtle drop shadow

Header Section:
├── Title (text-lg, font-medium)
└── Optional description (text-sm, muted-foreground)

Content Section:
└── Variable content based on card type
```

---

## 📱 Responsive Breakpoints

### Mobile (< 640px)
- Single column layout
- Compressed navigation (icons + short text)
- Stacked cards
- Reduced padding

### Tablet (640px - 1024px)
- Two column grid where appropriate
- Full navigation text
- Maintained card proportions

### Desktop (> 1024px)
- Multi-column layouts
- Full feature visibility
- Optimal spacing

---

## 🎨 View-Specific Designs

### 1. Dashboard View (Live Monitor)
```
Layout: 2x2 Grid on desktop, stacked on mobile

Components:
├── Camera Feed Card (top-left)
│   ├── Video placeholder area
│   ├── Recording indicator (red dot + "REC")
│   └── Camera controls
├── Drowsiness Monitor Card (top-right)
│   ├── Circular progress indicator
│   ├── Alert level badge
│   └── Current status text
├── Quick Stats Card (bottom-left)
│   ├── Grid of metric tiles
│   ├── Numeric values with labels
│   └── Status icons
└── Recent Alerts Card (bottom-right)
    ├── Scrollable alert list
    ├── Timestamp + severity
    └── Alert descriptions
```

### 2. Statistics View
```
Layout: Stacked cards with charts

Components:
├── Overview Metrics (4-column grid)
│   ├── Total Sessions
│   ├── Average Alert Level
│   ├── Critical Alerts
│   └── System Uptime
├── Drowsiness Trends Chart
│   ├── Line chart showing levels over time
│   └── Time period selector
├── Alert Distribution Chart
│   ├── Pie chart of alert types
│   └── Legend with percentages
└── Session History Table
    ├── Sortable columns
    ├── Session duration, alerts, status
    └── Pagination controls
```

### 3. Shop View
```
Layout: E-commerce grid layout

Components:
├── Store Header
│   ├── Title: "A.M.A.T.S. Equipment Store"
│   ├── Description text
│   └── Cart icon with item count
├── Search & Filters Section
│   ├── Search input
│   ├── Category filters
│   ├── Price range slider
│   └── Sort dropdown
├── Featured Products Banner
│   ├── Highlighted product cards
│   └── "Featured" badges
├── Product Grid
│   ├── Responsive product cards
│   ├── Product images
│   ├── Pricing, ratings, availability
│   └── Add to cart buttons
└── Shopping Cart Sidebar
    ├── Item list with quantities
    ├── Price calculations
    ├── Checkout button
    └── Cart total
```

### 4. Settings View
```
Layout: Form-based cards

Components:
├── System Settings Card
│   ├── Alert thresholds (sliders)
│   ├── Monitoring sensitivity
│   └── Auto-save toggle
├── Display Preferences Card
│   ├── Theme selector (light/dark)
│   ├── Language dropdown
│   └── Dashboard layout options
├── Notification Settings Card
│   ├── Alert types checkboxes
│   ├── Sound preferences
│   └── Email notifications toggle
└── Account & Security Card
    ├── Profile information
    ├── Password change
    └── Two-factor authentication
```

---

## 🔧 Interactive Elements

### Buttons
```
Primary Button:
├── Background: Primary color
├── Text: Primary-foreground color
├── Padding: px-4 py-2
├── Radius: Default
└── Hover: Slight opacity change

Secondary Button:
├── Border: Primary color
├── Background: Transparent
├── Text: Primary color
└── Hover: Background fill

Icon Buttons:
├── Square aspect ratio
├── Icon centered
├── Minimal padding
└── Hover: Background accent
```

### Form Elements
```
Input Fields:
├── Background: Input-background color
├── Border: Subtle border
├── Padding: px-3 py-2
├── Radius: Default
└── Focus: Primary ring

Dropdowns:
├── Trigger: Same as input
├── Content: Card styling
├── Options: Hover accent
└── Selected: Primary highlight

Toggles/Switches:
├── Track: Switch-background color
├── Thumb: White
├── Active: Primary color
└── Smooth transition
```

### Data Visualization
```
Charts (using Recharts):
├── Colors: Chart color variables (chart-1 through chart-5)
├── Grid: Subtle grid lines
├── Tooltips: Card styling
├── Legend: Below chart
└── Responsive sizing

Progress Indicators:
├── Track: Muted background
├── Fill: Primary or status color
├── Text: Centered percentage
└── Smooth animations
```

---

## 🛠️ Technical Implementation Notes

### CSS Framework
- **Tailwind CSS v4** with custom CSS variables
- Custom color tokens defined in `globals.css`
- Responsive design with mobile-first approach

### Component Library
- **shadcn/ui** components for consistent styling
- **Lucide React** for icons
- **Recharts** for data visualization

### State Management
- Local React state for UI interactions
- Simulated data for all functionality
- No external API dependencies in current version

### File Structure
```
components/
├── ui/ (shadcn components - don't modify)
├── DashboardView.tsx
├── StatisticsView.tsx  
├── ShopView.tsx
├── SettingsView.tsx
├── CameraFeed.tsx
├── ProductCard.tsx
└── ShoppingCart.tsx
```

---

## 🎨 Customization Guide

### Changing Colors
1. Edit the CSS variables in `/styles/globals.css`
2. Update both light and dark theme values
3. Maintain contrast ratios for accessibility

### Adding New Components
1. Create in `/components/` directory
2. Follow existing naming conventions
3. Use shadcn/ui components as base
4. Import and use in main App.tsx

### Modifying Layout
1. Edit the grid structures in view components
2. Adjust responsive breakpoints as needed
3. Update spacing using Tailwind classes

### Branding Changes
1. Update text content in App.tsx header
2. Modify logo/icon in header section
3. Update footer copyright and messaging

---

## 📐 Design Tokens Reference

### CSS Custom Properties
```css
/* Colors */
--primary: #030213
--background: #ffffff
--card: #ffffff
--muted: #ececf0
--border: rgba(0, 0, 0, 0.1)

/* Sizing */
--radius: 0.625rem
--font-size: 16px

/* Charts */
--chart-1: oklch(0.646 0.222 41.116)
--chart-2: oklch(0.6 0.118 184.704)
--chart-3: oklch(0.398 0.07 227.392)
--chart-4: oklch(0.828 0.189 84.429)
--chart-5: oklch(0.769 0.188 70.08)
```

### Tailwind Classes Reference
```css
/* Spacing */
p-4 = 16px padding
m-6 = 24px margin
space-x-3 = 12px horizontal gap

/* Typography */
text-2xl = 32px font size
text-sm = 14px font size
font-semibold = 600 font weight

/* Layout */
grid-cols-4 = 4 column grid
flex items-center = flex with center alignment
justify-between = space between flex items
```

---

This design specification provides everything needed to understand, modify, and extend the A.M.A.T.S. system interface. Each section can be edited independently to customize the design according to your needs.
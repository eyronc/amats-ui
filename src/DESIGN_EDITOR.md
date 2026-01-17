# A.M.A.T.S. Design Editor Guide

## 🎨 How to Edit Your Design

Your A.M.A.T.S. system design can be easily customized by editing the `design-config.json` file. This file controls all visual aspects of your system without needing to touch any code.

---

## 📁 Files You Can Edit

### 1. **`design-config.json`** - Main Design Configuration
This is your primary design control file. Edit values here to change:
- Colors and themes
- Typography and fonts  
- Layout and spacing
- Component settings
- Feature toggles

### 2. **`styles/globals.css`** - Advanced Styling
For advanced users who want to modify CSS variables directly.

---

## 🎯 Quick Edits Guide

### Change System Branding
```json
"branding": {
  "systemName": "YOUR_SYSTEM_NAME",
  "fullName": "Your Full System Description", 
  "tagline": "Your custom tagline",
  "copyright": "© 2024 Your Company",
  "footerMessage": "Your safety message"
}
```

### Change Colors
```json
"colors": {
  "primary": "#YOUR_PRIMARY_COLOR",
  "secondary": "#YOUR_SECONDARY_COLOR", 
  "success": "#YOUR_SUCCESS_COLOR",
  "warning": "#YOUR_WARNING_COLOR",
  "danger": "#YOUR_DANGER_COLOR"
}
```

### Enable/Disable Dark Mode
```json
"darkMode": {
  "enabled": true/false
}
```

### Modify Navigation Tabs
```json
"navigation": {
  "tabs": [
    {
      "id": "dashboard",
      "label": "Your Tab Name",
      "icon": "YourIcon", 
      "enabled": true/false
    }
  ]
}
```

### Change Shop Settings
```json
"shop": {
  "storeName": "Your Store Name",
  "storeTagline": "Your store description",
  "productsPerRow": {
    "mobile": 1,
    "tablet": 2,
    "desktop": 3
  }
}
```

---

## 🎨 Color Options

### Primary Colors
- `#030213` - Dark Navy (default)
- `#1a1a2e` - Medium Navy
- `#3b82f6` - Blue
- `#8b5cf6` - Purple  
- `#10b981` - Green
- `#f59e0b` - Orange
- `#ef4444` - Red

### Status Colors
- Success: `#22c55e` (Green)
- Warning: `#f59e0b` (Orange)  
- Danger: `#d4183d` (Red)
- Info: `#3b82f6` (Blue)

---

## 📐 Layout Options

### Grid Columns
```json
"gridColumns": {
  "mobile": 1,     // 1 column on mobile
  "tablet": 2,     // 2 columns on tablet  
  "desktop": 4     // 4 columns on desktop
}
```

### Card Sizes
- `"small"` - Compact cards
- `"medium"` - Standard cards (default)
- `"large"` - Extended cards

### Border Radius Options
- `"0"` - Square corners
- `"0.375rem"` - Slightly rounded  
- `"0.625rem"` - Default rounded
- `"1rem"` - Very rounded
- `"50%"` - Circular

---

## 🔧 Component Controls

### Enable/Disable Features
```json
"features": {
  "realTimeUpdates": true/false,
  "darkModeToggle": true/false, 
  "responsiveDesign": true/false,
  "animations": {
    "enabled": true/false
  }
}
```

### Dashboard Layout
```json
"dashboard": {
  "cards": [
    {
      "id": "cameraFeed",
      "enabled": true/false,  // Show/hide this card
      "position": "top-left", // Card position
      "size": "large"         // Card size
    }
  ]
}
```

---

## 🛍️ E-commerce Settings

### Currency & Pricing
```json
"ecommerce": {
  "currency": "USD",
  "currencySymbol": "$",
  "showOriginalPrice": true/false,
  "shippingThreshold": 100,
  "taxRate": 0.08
}
```

### Product Display
```json
"shop": {
  "showFilters": true/false,
  "showSearch": true/false,
  "enableCart": true/false,
  "featuredProductsCount": 3
}
```

---

## 🚨 Alert System Settings

### Alert Levels
```json
"monitoring": {
  "alertLevels": {
    "low": {
      "color": "#22c55e",
      "label": "Normal", 
      "threshold": 30
    },
    "medium": {
      "color": "#f59e0b",
      "label": "Caution",
      "threshold": 60  
    },
    "high": {
      "color": "#d4183d",
      "label": "Critical",
      "threshold": 90
    }
  }
}
```

---

## 📱 Responsive Settings

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

### Mobile-Specific Settings
```json
"navigation": {
  "compactOnMobile": true/false  // Show short labels on mobile
}
```

---

## 🎭 Icon Options

Available icons (from Lucide React):
- `Monitor`, `BarChart3`, `Settings`, `ShoppingBag`
- `Eye`, `Shield`, `AlertTriangle`, `Activity`
- `Camera`, `Zap`, `Bell`, `Users`, `Lock`
- `Heart`, `Star`, `TrendingUp`, `Wifi`

---

## 💡 Quick Tips

1. **Save your changes** - Edit `design-config.json` and refresh to see changes
2. **Test on mobile** - Use browser dev tools to test responsive design
3. **Color contrast** - Ensure text is readable on your chosen backgrounds
4. **Backup original** - Save a copy of the original config before major changes
5. **One change at a time** - Make small edits to see their effects

---

## 🚀 Advanced Customization

For advanced styling, you can also edit:

- **`styles/globals.css`** - CSS variables and base styles
- **Component files** in `/components/` - Individual component modifications
- **`App.tsx`** - Main layout structure

---

## 📞 Need Help?

Common issues:
- **Colors not changing?** - Check CSS variable names match your config
- **Layout broken?** - Verify grid column numbers are valid
- **Icons missing?** - Ensure icon names match Lucide React library
- **Mobile issues?** - Test responsive breakpoints in browser dev tools

Remember: Always test your changes on different screen sizes!
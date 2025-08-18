# Mobile UI Implementation Details

## Mobile Drawer System

The app uses a Mantine Drawer component for mobile settings that slides up from the bottom.

### Key Components

1. **Drawer Structure** (`src/App.tsx`)
   - Position: "bottom" 
   - Size: "80%" of screen height
   - Has `withCloseButton={false}` to remove default header
   - Toggle button appears at bottom when closed, shows "Settings" with up chevron
   - When open, settings button is at top of drawer content with down chevron

2. **Toggle Button Behavior**
   - Only visible on mobile (`isMobile` check using `useMediaQuery`)
   - When drawer closed: Fixed at bottom center with rounded top corners
   - When drawer open: Button is inside drawer content at the top
   - Chevron rotates based on state (up when closed, down when open)

### Mobile-Specific Behaviors

1. **Auto-close on Handout Selection**
   - `HandoutTypeSelector` accepts optional `onSelect` callback
   - Mobile version passes `closeDrawer` to auto-close when user selects a handout type
   - Desktop version doesn't pass this prop

2. **Positioning Controls Reset**
   - When changing handout types, positioning values reset to defaults:
     - zoom: 1
     - rotation: 0  
     - xOffset: 0
     - yOffset: 0
   - Implemented in `HandoutTypeSelector` via database update

## Touch Support

### XYPicker Component (`src/components/XYPicker.tsx`)

The XYPicker needed mobile touch support for drag functionality:

1. **Touch Event Handlers Added:**
   - `onTouchStart` - initiates dragging on touch
   - `touchmove` listener (with `passive: false` to allow preventDefault)
   - `touchend` listener to stop dragging
   - `preventDefault()` on touch events to prevent scrolling

2. **Event Flow:**
   - Both mouse and touch events update the same `dragging` state
   - `updateCoords()` function works with both clientX/clientY from mouse or touch.clientX/clientY
   - Touch events properly clean up on unmount

## Known Issues & Considerations

1. **Sticky Header in Drawer**
   - Currently the settings button scrolls with content
   - Future improvement: Make it sticky using flex layout with fixed header and scrollable content area

2. **Default Handout Type**
   - Set in `src/appState.ts` as `allConfigs[1].name` (NewspaperClipping)
   - Can be changed by modifying the index in the array

3. **Desktop vs Mobile Layouts**
   - Desktop: Left sidebar is always visible with `overflow-y-scroll`
   - Mobile: Content is in drawer, main view shows only the rendered handout
   - Both share the same `FormRenderer` and form components
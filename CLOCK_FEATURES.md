# Digital Clock & Time Tools

A comprehensive time management application featuring a World Clock with multiple time zones, Alarm Clock functionality, and Timer capabilities.

## 🌍 Features

### World Clock
- Display current time across 17+ major time zones
- Real-time updates every second
- Favorite time zones for quick access
- Beautiful glassmorphic UI design
- Analog-style progress bars
- Detailed time zone information

### Alarm Clock ⏰
- Set multiple alarms with custom labels
- Enable/disable alarms easily
- Timezone-aware alarm settings
- Current time display
- Delete unwanted alarms

### Timer ⏱
- Create unlimited countdown timers
- Pause and resume functionality
- Custom timer labels
- Completion notifications
- Reset timers to original duration

## 🎨 Design Highlights

- **Glassmorphism**: Modern frosted glass effect with backdrop blur
- **Dark Theme**: Comfortable viewing with dark slate backgrounds
- **Color-coded**: Different color schemes for each tool (blue, purple, orange)
- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Smooth Animations**: Polished transitions and hover effects

## 🚀 Quick Start

```bash
# Access the clock hub
http://localhost:3000/clock-hub

# Or navigate directly:
http://localhost:3000/clock      # World Clock
http://localhost:3000/alarm      # Alarm Clock
http://localhost:3000/timer      # Timer
```

## 📦 Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom gradients
- **State Management**: React Hooks (useState, useEffect)
- **Internationalization**: Intl API for time zones

## 📂 File Structure

```
src/app/
├── clock/
│   └── page.tsx          # World Clock component
├── alarm/
│   └── page.tsx          # Alarm Clock component
├── timer/
│   └── page.tsx          # Timer component
└── clock-hub/
    └── page.tsx          # Hub/Landing page
```

## ⏰ Time Zones Supported

- UTC (Universal)
- Asia: Jakarta, Bangkok, Singapore, Hong Kong, Tokyo, Shanghai
- Australia/Pacific: Sydney, Auckland
- Europe: London, Paris, Moscow
- Americas: New York, Chicago, Denver, Los Angeles, Honolulu

## 🎯 Key Features Explained

### Real-time Updates
All clocks update every second using `setInterval`, ensuring accuracy and synchronization.

### Timezone Handling
Using JavaScript's `Intl.DateTimeFormat` API with `timeZone` option for accurate time conversion.

### Favorites System
Quickly access your most-used time zones while still having access to all zones.

### Multiple Timers
Manage several countdown timers simultaneously, perfect for productivity and time management.

## 💡 Usage Examples

### Business Use
- Schedule calls across global teams
- Track deadlines in different regions
- Set reminders for international meetings

### Personal Use
- Track friends/family in different countries
- Schedule workout/meditation sessions
- Productivity timer (Pomodoro technique)

### Education
- Teach about time zones
- Demonstrate timezone math
- Learn about international time management

## 🔧 Customization

Easily add more time zones by adding to the `TIMEZONES` array:

```typescript
const TIMEZONES: TimeZone[] = [
  { name: 'Asia/Jakarta', label: 'Jakarta (WIB)', offset: 'UTC+7' },
  // Add more zones here
];
```

## 📱 Responsive Design

- **Mobile**: Single column layout
- **Tablet**: 2-3 column grid
- **Desktop**: Full 3-4 column grid

## ⚙️ Performance

- Optimized re-renders using React hooks
- Efficient interval management with cleanup
- Minimal state updates
- No unnecessary DOM manipulations

## 🌟 Future Enhancements

- [ ] Analog clock display
- [ ] Audio notifications for alarms
- [ ] Stopwatch functionality
- [ ] World time statistics
- [ ] Calendar integration
- [ ] Local storage for saved preferences
- [ ] Multiple alarm sounds
- [ ] Snooze functionality

## 📝 Notes

- Times are displayed in 24-hour format
- Seconds pulse animation shows real-time updates
- Favorite markers are session-based (not persisted)
- Alarms don't have actual audio in this version

---

**Created with ❤️ for time management**

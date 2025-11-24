# Visual Feature Guide

## 🎨 Page Screenshots & Features

### 1. Login Page (`/login`)
```
┌─────────────────────────────────────┐
│   Course Attendance Admin           │
│   Sign in to your account           │
│                                     │
│   ┌───────────────────────────┐   │
│   │ Username                  │   │
│   └───────────────────────────┘   │
│   ┌───────────────────────────┐   │
│   │ Password                  │   │
│   └───────────────────────────┘   │
│                                     │
│   [      Sign in      ]            │
│                                     │
│   Don't have an account? Sign up   │
└─────────────────────────────────────┘
```
**Features:**
- Simple, clean login form
- Link to signup page
- Error message display
- Loading state during authentication

---

### 2. Dashboard (`/`)
```
┌──────────────────────────────────────────────────────────┐
│ 📊 Dashboard                                             │
│                                                          │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│ │ Total    │ │ Total    │ │ Total    │ │Attendance│  │
│ │ Courses  │ │ Students │ │ Sessions │ │   Rate   │  │
│ │   12     │ │   150    │ │   48     │ │   87%    │  │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                                                          │
│ Attendance Overview                                      │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐                   │
│ │ Present │ │ Absent  │ │  Late   │                   │
│ │  1,234  │ │   156   │ │   89    │                   │
│ └─────────┘ └─────────┘ └─────────┘                   │
│                                                          │
│ Quick Actions                                            │
│ [+ Create] [📅 Create] [👤 Add  ] [📊 View  ]         │
│ [ Course ] [ Session] [Student ] [Reports]              │
└──────────────────────────────────────────────────────────┘
```
**Features:**
- Real-time statistics
- Visual cards with icons
- Attendance breakdown
- Quick action buttons

---

### 3. Courses Page (`/courses`)
```
┌──────────────────────────────────────────────────────────┐
│ Courses                              [+ Add Course]      │
│                                                          │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│ │ CS101      │ │ MATH201    │ │ PHY301     │          │
│ │ Intro to   │ │ Calculus   │ │ Quantum    │          │
│ │ Computing  │ │            │ │ Physics    │          │
│ │            │ │            │ │            │          │
│ │ Start: ... │ │ Start: ... │ │ Start: ... │          │
│ │ End: ...   │ │ End: ...   │ │ End: ...   │          │
│ │            │ │            │ │            │          │
│ │[Sessions]  │ │[Sessions]  │ │[Sessions]  │          │
│ │[Edit][Del] │ │[Edit][Del] │ │[Edit][Del] │          │
│ └────────────┘ └────────────┘ └────────────┘          │
└──────────────────────────────────────────────────────────┘
```
**Features:**
- Card-based layout
- Course details at a glance
- Quick actions (Sessions, Edit, Delete)
- Modal form for create/edit

---

### 4. Sessions Page (`/sessions`)
```
┌──────────────────────────────────────────────────────────┐
│ Sessions                            [+ Create Session]   │
│                                                          │
│ Filter by Course: [CS101 - Intro to Computing ▼]       │
│                                                          │
│ ┌────────────────────────────────────────────────────┐ │
│ │ CS101 - Introduction to Computing                  │ │
│ │ Date: Nov 23, 2025                                 │ │
│ │ Time: 9:00 AM - 11:00 AM                          │ │
│ │ ✓ QR Code Active (expires: 9:15 AM)              │ │
│ │                      [Generate QR] [View Attendance]│ │
│ └────────────────────────────────────────────────────┘ │
│                                                          │
│ ┌────────────────────────────────────────────────────┐ │
│ │ CS101 - Introduction to Computing                  │ │
│ │ Date: Nov 20, 2025                                 │ │
│ │ Time: 9:00 AM - 11:00 AM                          │ │
│ │                      [Generate QR] [View Attendance]│ │
│ └────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```
**Features:**
- Course filter dropdown
- Session list with details
- QR code status indicator
- Generate QR and view attendance buttons

---

### 5. QR Code Generator Modal
```
┌───────────────────────────────────────────┐
│ QR Code for Attendance               [×]  │
│                                           │
│ CS101 - Introduction to Computing         │
│ Nov 23, 2025 | 9:00 AM - 11:00 AM        │
│                                           │
│        ┌─────────────────┐               │
│        │  █▀▀▀▀▀▀▀▀▀█   │               │
│        │  █ ▄▄▄▄▄ █ █   │               │
│        │  █ █   █ █ █   │  [QR CODE]    │
│        │  █ █▄▄▄█ █ █   │               │
│        │  █▄▄▄▄▄▄▄█ █   │               │
│        └─────────────────┘               │
│                                           │
│      Time Remaining: 8:45                 │
│                                           │
│ Check-in URL:                             │
│ http://localhost:8080/check-in?token=... │
│                                           │
│        [Regenerate]  [Close]              │
└───────────────────────────────────────────┘
```
**Features:**
- Real QR code image (scannable)
- Live countdown timer
- Session details
- Check-in URL display
- Regenerate option

---

### 6. Students Page (`/students`)
```
┌──────────────────────────────────────────────────────────┐
│ Students                              [+ Add Student]    │
│                                                          │
│ [Search by name or student number...            ]       │
│                                                          │
│ ┌────────────────────────────────────────────────────┐ │
│ │ Student# │ Full Name      │ Email          │Actions│ │
│ ├──────────┼────────────────┼────────────────┼───────┤ │
│ │ S001     │ John Doe       │ john@email.com │ View  │ │
│ │ S002     │ Jane Smith     │ jane@email.com │ View  │ │
│ │ S003     │ Bob Johnson    │ bob@email.com  │ View  │ │
│ │ ...      │ ...            │ ...            │ ...   │ │
│ └────────────────────────────────────────────────────┘ │
│                                                          │
│           [Previous]  Page 1 of 15  [Next]              │
└──────────────────────────────────────────────────────────┘
```
**Features:**
- Search bar with live filtering
- Table layout with all student info
- Pagination controls
- Link to attendance history

---

### 7. Attendance Page (`/attendance`)
```
┌──────────────────────────────────────────────────────────┐
│ Attendance Management                                    │
│                                                          │
│ CS101 - Introduction to Computing                        │
│ Date: Nov 23, 2025                                       │
│ Time: 9:00 AM - 11:00 AM                                │
│                                                          │
│ Total Check-ins: 45              [Export to CSV]        │
│                                                          │
│ ┌────────────────────────────────────────────────────┐ │
│ │ Student# │ Name      │ Status  │ Check-in Time    │ │
│ ├──────────┼───────────┼─────────┼──────────────────┤ │
│ │ S001     │ John Doe  │ PRESENT │ 9:05 AM          │ │
│ │ S002     │ Jane Smith│ PRESENT │ 9:03 AM          │ │
│ │ S005     │ Bob Lee   │ LATE    │ 9:25 AM          │ │
│ │ ...      │ ...       │ ...     │ ...              │ │
│ └────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```
**Features:**
- Session details display
- Total check-ins count
- Export to CSV button
- Table with status badges
- Color-coded status (Green/Yellow/Red)

---

## 🎨 Color Scheme

- **Primary Blue**: `#2563EB` - Buttons, links, accents
- **Success Green**: `#10B981` - Present status, positive actions
- **Warning Yellow**: `#F59E0B` - Late status, warnings
- **Error Red**: `#EF4444` - Absent status, delete actions
- **Gray Scale**: Various shades for text, borders, backgrounds

---

## 🔧 Component Interactions

### Navigation Flow
```
Login/Signup → Dashboard → Courses/Sessions/Students/Attendance
                   ↓
            Quick Actions
                   ↓
         Direct to relevant page
```

### QR Code Flow
```
Sessions → Select Session → Generate QR → Set Validity 
    ↓                                          ↓
View QR Code ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ←
    ↓
Students Scan → Check In → Attendance Record
    ↓
View Attendance → Export CSV
```

### Data Flow
```
User Action → API Call → Loading State → Success/Error → UI Update
                                              ↓
                                      React Query Cache
                                              ↓
                                    Automatic Re-fetch
```

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (stacked layout)
- **Tablet**: 768px - 1024px (2-column layout)
- **Desktop**: > 1024px (3-column layout)

All pages automatically adapt to screen size!

---

## ⌨️ Keyboard Shortcuts

While not explicitly implemented, all forms support:
- `Enter` to submit
- `Esc` to close modals
- `Tab` for navigation

---

This completes your visual guide! The application is intuitive and follows modern web design patterns.

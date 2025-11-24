# Quick Start Guide

## Prerequisites

1. **Backend API**: Make sure the Course Attendance System API is running at `http://localhost:8080`
2. **Node.js**: Version 18 or higher

## Getting Started

### 1. Install Dependencies (Already Done)
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 3. First Time Setup

1. **Access the Application**: Open your browser and navigate to `http://localhost:3000`

2. **Create Admin Account**:
   - Click "Don't have an account? Sign up"
   - Fill in the registration form
   - Select "Admin" as the role
   - Click "Sign up"

3. **Login**: You'll be automatically logged in and redirected to the dashboard

## Main Features Walkthrough

### Dashboard
- View overall statistics (courses, students, sessions, attendance rate)
- Quick actions for common tasks

### Courses Management (`/courses`)
1. Click "+ Add Course" to create a new course
2. Fill in: Course Code, Title, Description, Start/End dates
3. View all courses in a card layout
4. Edit or delete courses
5. Click "Sessions" to view/manage sessions for a course

### Sessions Management (`/sessions`)
1. Select a course from the dropdown
2. Click "+ Create Session" to add a new session
3. Fill in session details (date, start time, end time)
4. **Generate QR Code**:
   - Click "Generate QR" on any session
   - Set validity duration (default: 10 minutes)
   - Click "Generate QR Code"
   - QR code displays with countdown timer
   - Students can scan this QR code to check in
   - Regenerate if expired
5. Click "View Attendance" to see who checked in

### Students Management (`/students`)
1. Click "+ Add Student" to register a new student
2. Fill in: Student Number, Full Name, Email
3. Use search bar to find students
4. Navigate through pages if you have many students
5. Click "View Attendance" to see a student's attendance history

### Attendance Management (`/attendance`)
1. View all checked-in students for a session
2. See check-in status: Present, Late, or Absent
3. Export attendance to CSV for reporting
4. View timestamps for each check-in

## User Roles

- **ADMIN**: Full access to all features (this is what you need)
- **STUDENT**: Limited access (not used in this admin panel)

## Troubleshooting

### Backend Not Running
If you see connection errors, make sure the backend API is running at `http://localhost:8080`

### Token Expired
If you get logged out unexpectedly, your JWT token may have expired. Simply log in again.

### QR Code Not Generating
1. Make sure the session exists and is valid
2. Check that the backend API is accessible
3. Verify you have admin privileges

### Cannot Create/Edit Items
Ensure you're logged in with an admin account (not student role)

## API Configuration

To change the backend API URL, edit `src/lib/axios.ts`:

```typescript
const API_BASE_URL = 'http://localhost:8080'; // Change this URL
```

## Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

The built files will be in the `dist` directory.

## Common Workflows

### Weekly Session Setup
1. Create course (once)
2. Create weekly sessions in advance
3. Generate QR code before each class
4. Monitor real-time check-ins
5. Export attendance after class

### Student Registration
1. Prepare student list (Excel/CSV)
2. Add students one by one (or use bulk import if API supports it)
3. Students can then register user accounts linked to their student ID

### Attendance Reporting
1. Navigate to Attendance page
2. Select the session
3. Review check-ins
4. Export to CSV for records
5. View statistics on dashboard

## Tips

- **QR Code Validity**: Set shorter validity (5-10 min) for security
- **Check-in Window**: Generate QR code at start of class
- **Regular Exports**: Export attendance regularly for backup
- **Student Search**: Use search to quickly find specific students

## Support

For issues or questions about the API, refer to the Swagger documentation at:
`http://localhost:8080/swagger-ui.html`

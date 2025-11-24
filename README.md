# Course Attendance Admin Frontend

A React-based admin panel for managing course attendance with QR code check-in functionality.

## Features

- **Authentication & Authorization**: Secure login/signup with JWT tokens, role-based access control (Admin only)
- **Course Management**: Create, read, update, and delete courses
- **Session Management**: 
  - Create sessions for courses
  - Generate time-limited QR codes for student check-ins
  - View active QR code status with countdown timer
- **Student Management**: 
  - Add students with their details
  - Search and pagination support
- **Attendance Management**:
  - View checked-in students by session
  - Real-time attendance tracking
  - Export attendance to CSV
  - Attendance statistics and reports
- **Dashboard**: Overview of courses, students, sessions, and attendance statistics

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **TailwindCSS** for styling
- **React Router** for navigation
- **TanStack Query (React Query)** for server state management
- **Axios** for API calls
- **QRCode** library for QR code generation
- **Zustand** for client state management

## API Integration

The application integrates with the Course Attendance System API at `http://localhost:8080`. The API client is auto-generated from the Swagger documentation with full TypeScript support.

### API Endpoints Used:

- **Authentication**:
  - POST `/api/auth/login` - User login
  - POST `/api/auth/signup` - User registration
  - GET `/api/auth/me` - Get current user

- **Courses**:
  - GET `/api/courses` - List all courses
  - POST `/api/courses` - Create course
  - PUT `/api/courses/{id}` - Update course
  - DELETE `/api/courses/{id}` - Delete course

- **Sessions**:
  - POST `/api/admin/sessions` - Create session
  - GET `/api/admin/sessions/course/{courseId}` - Get sessions by course
  - POST `/api/admin/sessions/{id}/generate-qr` - Generate QR code

- **Students**:
  - GET `/api/students` - List students (paginated)
  - POST `/api/students` - Create student
  - GET `/api/students/search` - Search students

- **Attendance**:
  - GET `/api/attendance/session/{sessionId}` - Get attendance by session
  - GET `/api/attendance/statistics` - Get overall statistics

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Setup

The application expects the backend API to be running at `http://localhost:8080`. To change this, update the `API_BASE_URL` in `src/lib/axios.ts`.

## Usage

1. **Login/Signup**: Create an admin account or login with existing credentials
2. **Create Courses**: Add courses with code, title, and description
3. **Create Sessions**: Schedule class sessions for courses
4. **Add Students**: Register students in the system
5. **Generate QR Codes**: Create time-limited QR codes for attendance check-in
6. **Monitor Attendance**: View real-time check-ins and export reports

## Project Structure

```
src/
├── api/              # API client and functions
├── components/       # Reusable components
├── contexts/         # React contexts (Auth)
├── lib/              # Utilities (axios config)
├── pages/            # Page components
├── types/            # TypeScript type definitions
├── App.tsx           # Main app component
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## Missing API Features

Based on the implementation, the following features might be useful additions to the backend API:

1. **Update/Delete Session**: Currently, there's no API to update or delete sessions after creation
2. **Update/Delete Student**: No endpoints to modify or remove student records
3. **Bulk Student Import**: API to import multiple students at once (e.g., from CSV)
4. **Attendance Report Filters**: More advanced filtering options (by date range, course, etc.)
5. **Session Templates**: Ability to create recurring sessions or session templates
6. **Email Notifications**: Send notifications to students about upcoming sessions
7. **Student Groups/Classes**: Organize students into groups or classes
8. **Attendance Excuse/Override**: Allow admins to manually mark attendance or add excuses

## License

This project is for educational purposes.

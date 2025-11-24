// API Types based on Swagger documentation

export enum UserRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
}

// ============ Course Types ============
export interface Course {
  id?: number;
  code: string;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

// ============ Student Types ============
export interface Student {
  id?: number;
  studentNumber: string;
  fullName: string;
  email: string;
}

export interface StudentDto {
  id: number;
  studentNumber: string;
  fullName: string;
  email: string;
}

export interface PageStudentDto {
  content: StudentDto[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// ============ Session Types ============
export interface SessionDto {
  id: number;
  courseId: number;
  courseCode: string;
  courseTitle: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  qrToken?: string;
  qrTokenExpiresAt?: string;
  qrTokenActive: boolean;
}

export interface CreateSessionRequest {
  courseId: number;
  sessionDate: string;
  startTime: string;
  endTime: string;
}

export interface QrTokenResponse {
  sessionId: number;
  qrToken: string;
  checkInUrl: string;
  expiresAt: string;
}

export interface QrVerificationResponse {
  valid: boolean;
  message: string;
  sessionId?: number;
  courseCode?: string;
  courseTitle?: string;
  sessionDate?: string;
  expiresAt?: string;
  alreadyCheckedIn?: boolean;
}

// ============ Attendance Types ============
export interface AttendanceDto {
  id: number;
  sessionId: number;
  studentId: number;
  studentNumber: string;
  studentName: string;
  status: AttendanceStatus;
  checkedAt: string;
}

export interface CheckInRequest {
  sessionId: number;
  qrToken: string;
}

export interface AttendanceStatisticsDto {
  totalSessions: number;
  totalStudents: number;
  totalAttendanceRecords: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  attendanceRate: number;
  statusCount?: Record<string, number>;
}

// ============ Auth Types ============
export interface UserDto {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  studentId?: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  password: string;
  email: string;
  fullName: string;
  role: UserRole;
  studentId?: number;
}

export interface AuthResponse {
  token: string;
  type: string;
  user: UserDto;
}

export interface ErrorResponse {
  message: string;
}

// ============ Pagination Types ============
export interface PaginationParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

export interface SearchStudentsParams extends PaginationParams {
  keyword: string;
}

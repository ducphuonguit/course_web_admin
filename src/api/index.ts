import apiClient from '../lib/axios';
import {
  LoginRequest,
  SignupRequest,
  AuthResponse,
  UserDto,
  Course,
  Student,
  StudentDto,
  PageStudentDto,
  PaginationParams,
  SearchStudentsParams,
  SessionDto,
  CreateSessionRequest,
  QrTokenResponse,
  QrVerificationResponse,
  AttendanceDto,
  CheckInRequest,
  AttendanceStatisticsDto,
} from '../types/api';

// ============ Authentication APIs ============
export const authAPI = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/login', data);
    return response.data;
  },

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/signup', data);
    return response.data;
  },

  getCurrentUser: async (): Promise<UserDto> => {
    const response = await apiClient.get<UserDto>('/api/auth/me');
    return response.data;
  },
};

// ============ Course APIs ============
export const courseAPI = {
  getAll: async (): Promise<Course[]> => {
    const response = await apiClient.get<Course[]>('/api/courses');
    return response.data;
  },

  getById: async (id: number): Promise<Course> => {
    const response = await apiClient.get<Course>(`/api/courses/${id}`);
    return response.data;
  },

  create: async (data: Course): Promise<Course> => {
    const response = await apiClient.post<Course>('/api/courses', data);
    return response.data;
  },

  update: async (id: number, data: Course): Promise<Course> => {
    const response = await apiClient.put<Course>(`/api/courses/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/courses/${id}`);
  },
};

// ============ Student APIs ============
export const studentAPI = {
  getAll: async (params?: PaginationParams): Promise<PageStudentDto> => {
    const response = await apiClient.get<PageStudentDto>('/api/students', { params });
    return response.data;
  },

  getById: async (id: number): Promise<StudentDto> => {
    const response = await apiClient.get<StudentDto>(`/api/students/${id}`);
    return response.data;
  },

  create: async (data: Student): Promise<StudentDto> => {
    const response = await apiClient.post<StudentDto>('/api/students', data);
    return response.data;
  },

  search: async (params: SearchStudentsParams): Promise<PageStudentDto> => {
    const response = await apiClient.get<PageStudentDto>('/api/students/search', { params });
    return response.data;
  },
};

// ============ Session APIs ============
export const sessionAPI = {
  create: async (data: CreateSessionRequest): Promise<SessionDto> => {
    const response = await apiClient.post<SessionDto>('/api/admin/sessions', data);
    return response.data;
  },

  getById: async (id: number): Promise<SessionDto> => {
    const response = await apiClient.get<SessionDto>(`/api/admin/sessions/${id}`);
    return response.data;
  },

  getByCourse: async (courseId: number): Promise<SessionDto[]> => {
    const response = await apiClient.get<SessionDto[]>(`/api/admin/sessions/course/${courseId}`);
    return response.data;
  },

  generateQR: async (sessionId: number, validityMinutes: number = 10): Promise<QrTokenResponse> => {
    const response = await apiClient.post<QrTokenResponse>(
      `/api/admin/sessions/${sessionId}/generate-qr`,
      null,
      { params: { validityMinutes } }
    );
    return response.data;
  },
};

// ============ Attendance APIs ============
export const attendanceAPI = {
  checkIn: async (data: CheckInRequest): Promise<AttendanceDto> => {
    const response = await apiClient.post<AttendanceDto>('/api/attendance/check-in', data);
    return response.data;
  },

  scanQR: async (sessionId: number, qrToken: string): Promise<QrVerificationResponse> => {
    const response = await apiClient.get<QrVerificationResponse>('/api/attendance/scan', {
      params: { sessionId, qrToken },
    });
    return response.data;
  },

  getBySession: async (sessionId: number): Promise<AttendanceDto[]> => {
    const response = await apiClient.get<AttendanceDto[]>(`/api/attendance/session/${sessionId}`);
    return response.data;
  },

  getByStudent: async (studentId: number): Promise<AttendanceDto[]> => {
    const response = await apiClient.get<AttendanceDto[]>(`/api/attendance/student/${studentId}`);
    return response.data;
  },

  getStatistics: async (): Promise<AttendanceStatisticsDto> => {
    const response = await apiClient.get<AttendanceStatisticsDto>('/api/attendance/statistics');
    return response.data;
  },

  getStatisticsByStudent: async (studentId: number): Promise<any> => {
    const response = await apiClient.get(`/api/attendance/statistics/student/${studentId}`);
    return response.data;
  },

  getStatisticsBySession: async (sessionId: number): Promise<any> => {
    const response = await apiClient.get(`/api/attendance/statistics/session/${sessionId}`);
    return response.data;
  },

  getStatisticsByCourse: async (courseId: number): Promise<any> => {
    const response = await apiClient.get(`/api/attendance/statistics/course/${courseId}`);
    return response.data;
  },
};

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/Login';
import { SignupPage } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { CoursesPage } from './pages/Courses';
import { SessionsPage } from './pages/Sessions';
import { StudentsPage } from './pages/Students';
import { AttendancePage } from './pages/Attendance';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute adminOnly>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <ProtectedRoute adminOnly>
                  <Layout>
                    <CoursesPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/sessions"
              element={
                <ProtectedRoute adminOnly>
                  <Layout>
                    <SessionsPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/students"
              element={
                <ProtectedRoute adminOnly>
                  <Layout>
                    <StudentsPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance"
              element={
                <ProtectedRoute adminOnly>
                  <Layout>
                    <AttendancePage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance/session/:sessionId"
              element={
                <ProtectedRoute adminOnly>
                  <Layout>
                    <AttendancePage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route path="/unauthorized" element={<div className="text-center py-12">Unauthorized Access</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

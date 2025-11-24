import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { courseAPI, attendanceAPI } from '../api';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: courseAPI.getAll,
  });

  const { data: stats } = useQuery({
    queryKey: ['attendance-stats'],
    queryFn: attendanceAPI.getStatistics,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm font-medium">Total Courses</div>
          <div className="text-3xl font-bold text-blue-600 mt-2">
            {courses?.length || 0}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm font-medium">Total Students</div>
          <div className="text-3xl font-bold text-green-600 mt-2">
            {stats?.totalStudents || 0}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm font-medium">Total Sessions</div>
          <div className="text-3xl font-bold text-purple-600 mt-2">
            {stats?.totalSessions || 0}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm font-medium">Attendance Rate</div>
          <div className="text-3xl font-bold text-orange-600 mt-2">
            {stats?.attendanceRate ? `${stats.attendanceRate.toFixed(1)}%` : '0%'}
          </div>
        </div>
      </div>

      {/* Attendance Overview */}
      {stats && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Attendance Overview</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">{stats.presentCount}</div>
              <div className="text-sm text-gray-600">Present</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded">
              <div className="text-2xl font-bold text-red-600">{stats.absentCount}</div>
              <div className="text-sm text-gray-600">Absent</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded">
              <div className="text-2xl font-bold text-yellow-600">{stats.lateCount}</div>
              <div className="text-sm text-gray-600">Late</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {/* <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/courses/new"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-center transition"
          >
            <div className="text-2xl mb-2">➕</div>
            <div className="text-sm font-medium">Create Course</div>
          </Link>
          <Link
            to="/sessions/new"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-center transition"
          >
            <div className="text-2xl mb-2">📅</div>
            <div className="text-sm font-medium">Create Session</div>
          </Link>
          <Link
            to="/students/new"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-center transition"
          >
            <div className="text-2xl mb-2">👤</div>
            <div className="text-sm font-medium">Add Student</div>
          </Link>
          <Link
            to="/attendance"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-center transition"
          >
            <div className="text-2xl mb-2">📊</div>
            <div className="text-sm font-medium">View Reports</div>
          </Link>
        </div>
      </div> */}
    </div>
  );
};

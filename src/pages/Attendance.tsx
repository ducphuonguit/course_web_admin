import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { attendanceAPI, sessionAPI } from '../api';
import { AttendanceStatus } from '../types/api';

export const AttendancePage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId?: string }>();
  const selectedSessionId = sessionId ? Number(sessionId) : null;

  const { data: attendance, isLoading } = useQuery({
    queryKey: ['attendance', selectedSessionId],
    queryFn: () =>
      selectedSessionId
        ? attendanceAPI.getBySession(selectedSessionId)
        : Promise.resolve([]),
    enabled: !!selectedSessionId,
  });

  const { data: session } = useQuery({
    queryKey: ['session', selectedSessionId],
    queryFn: () => (selectedSessionId ? sessionAPI.getById(selectedSessionId) : null),
    enabled: !!selectedSessionId,
  });

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case AttendanceStatus.PRESENT:
        return 'bg-green-100 text-green-800';
      case AttendanceStatus.LATE:
        return 'bg-yellow-100 text-yellow-800';
      case AttendanceStatus.ABSENT:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const exportToCSV = () => {
    if (!attendance) return;

    const headers = ['Student Number', 'Student Name', 'Status', 'Checked At'];
    const rows = attendance.map((a) => [
      a.studentNumber,
      a.studentName,
      a.status,
      new Date(a.checkedAt).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance_session_${selectedSessionId}.csv`;
    link.click();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Attendance Management</h1>

      {session && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">
            {session.courseCode} - {session.courseTitle}
          </h2>
          <div className="text-gray-600">
            <div>Date: {new Date(session.sessionDate).toLocaleDateString()}</div>
            <div>
              Time: {new Date(session.startTime).toLocaleTimeString()} -{' '}
              {new Date(session.endTime).toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex justify-between items-center">
        <div className="text-lg font-semibold">
          {attendance ? `Total Check-ins: ${attendance.length}` : 'Select a session to view attendance'}
        </div>
        {attendance && attendance.length > 0 && (
          <button
            onClick={exportToCSV}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Export to CSV
          </button>
        )}
      </div>

      {isLoading && <div>Loading attendance...</div>}

      {attendance && attendance.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Student Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Check-in Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendance.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.studentNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.studentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(record.checkedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedSessionId && !attendance?.length && !isLoading && (
        <div className="text-center py-12 text-gray-500">
          No check-ins recorded for this session yet.
        </div>
      )}
    </div>
  );
};

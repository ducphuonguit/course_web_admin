import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sessionAPI, courseAPI } from '../api';
import { SessionDto, CreateSessionRequest } from '../types/api';
import { QRCodeGenerator } from '../components/QRCodeGenerator';

export const SessionsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedSession, setSelectedSession] = useState<SessionDto | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: courseAPI.getAll,
  });

  const { data: sessions, isLoading } = useQuery({
    queryKey: ['sessions', selectedCourseId],
    queryFn: () =>
      selectedCourseId ? sessionAPI.getByCourse(selectedCourseId) : Promise.resolve([]),
    enabled: !!selectedCourseId,
  });

  const handleShowQR = (session: SessionDto) => {
    setSelectedSession(session);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sessions</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create Session
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Course
        </label>
        <select
          className="px-4 py-2 border border-gray-300 rounded"
          value={selectedCourseId || ''}
          onChange={(e) => setSelectedCourseId(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Select a course</option>
          {courses?.map((course) => (
            <option key={course.id} value={course.id}>
              {course.code} - {course.title}
            </option>
          ))}
        </select>
      </div>

      {showForm && (
        <SessionForm onClose={() => setShowForm(false)} />
      )}

      {selectedSession && (
        <QRCodeGenerator
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}

      {isLoading && <div>Loading sessions...</div>}

      <div className="space-y-4">
        {sessions?.map((session) => (
          <div key={session.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  {session.courseCode} - {session.courseTitle}
                </h3>
                <div className="text-gray-600 space-y-1">
                  <div>
                    Date: {new Date(session.sessionDate).toLocaleDateString()}
                  </div>
                  <div>
                    Time: {new Date(session.startTime).toLocaleTimeString()} -{' '}
                    {new Date(session.endTime).toLocaleTimeString()}
                  </div>
                  {session.qrTokenActive && (
                    <div className="text-green-600 font-medium">
                      ✓ QR Code Active (expires:{' '}
                      {session.qrTokenExpiresAt &&
                        new Date(session.qrTokenExpiresAt).toLocaleTimeString()}
                      )
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {session.qrToken && session.qrTokenActive && (
                  <button
                    onClick={() => handleShowQR(session)}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    View Current QR
                  </button>
                )}
                <button
                  onClick={() => handleShowQR(session)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Generate New QR
                </button>
                <a
                  href={`/attendance/session/${session.id}`}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  View Attendance
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCourseId && !sessions?.length && !isLoading && (
        <div className="text-center py-12 text-gray-500">
          No sessions found for this course. Create one!
        </div>
      )}

      {!selectedCourseId && (
        <div className="text-center py-12 text-gray-500">
          Please select a course to view sessions
        </div>
      )}
    </div>
  );
};

interface SessionFormProps {
  onClose: () => void;
}

const SessionForm: React.FC<SessionFormProps> = ({ onClose }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<CreateSessionRequest>({
    courseId: 0,
    sessionDate: '',
    startTime: '',
    endTime: '',
  });

  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: courseAPI.getAll,
  });

  const createMutation = useMutation({
    mutationFn: sessionAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      onClose();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMutation.mutateAsync(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.name === 'courseId' ? Number(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Create Session</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course
            </label>
            <select
              name="courseId"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.courseId}
              onChange={handleChange}
            >
              <option value="">Select a course</option>
              {courses?.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Session Date
            </label>
            <input
              type="datetime-local"
              name="sessionDate"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.sessionDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="datetime-local"
              name="startTime"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.startTime}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="datetime-local"
              name="endTime"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.endTime}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

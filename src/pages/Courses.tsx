import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { courseAPI } from '../api';
import { Course } from '../types/api';
import { Link } from 'react-router-dom';

export const CoursesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: courseAPI.getAll,
  });

  const deleteMutation = useMutation({
    mutationFn: courseAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setEditingCourse(null);
    setShowForm(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Courses</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Course
        </button>
      </div>

      {showForm && (
        <CourseForm
          course={editingCourse}
          onClose={handleCloseForm}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <p className="text-gray-600 text-sm">{course.code}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4 line-clamp-2">{course.description}</p>
            <div className="text-sm text-gray-500 mb-4">
              {course.startDate && (
                <div>Start: {new Date(course.startDate).toLocaleDateString()}</div>
              )}
              {course.endDate && (
                <div>End: {new Date(course.endDate).toLocaleDateString()}</div>
              )}
            </div>
            <div className="flex gap-2">
              <Link
                to={`/sessions?courseId=${course.id}`}
                className="flex-1 text-center bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-sm"
              >
                Sessions
              </Link>
              <button
                onClick={() => handleEdit(course)}
                className="flex-1 bg-yellow-600 text-white px-3 py-2 rounded hover:bg-yellow-700 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => course.id && handleDelete(course.id)}
                className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {!courses?.length && (
        <div className="text-center py-12 text-gray-500">
          No courses found. Create your first course!
        </div>
      )}
    </div>
  );
};

interface CourseFormProps {
  course: Course | null;
  onClose: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ course, onClose }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Course>(
    course || {
      code: '',
      title: '',
      description: '',
      startDate: '',
      endDate: '',
    }
  );

  const createMutation = useMutation({
    mutationFn: courseAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Course }) =>
      courseAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      onClose();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (course?.id) {
      await updateMutation.mutateAsync({ id: course.id, data: formData });
    } else {
      await createMutation.mutateAsync(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          {course ? 'Edit Course' : 'Create Course'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Code
            </label>
            <input
              type="text"
              name="code"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.code}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="datetime-local"
              name="startDate"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="datetime-local"
              name="endDate"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {course ? 'Update' : 'Create'}
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

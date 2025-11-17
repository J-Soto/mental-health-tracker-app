import React, { useState } from 'react';
import { useLogs } from '../../hooks/useLogs';

interface DeleteLogButtonProps {
  logId: string;
}

export const DeleteLogButton: React.FC<DeleteLogButtonProps> = ({ logId }) => {
  const { deleteLogMutation } = useLogs();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    deleteLogMutation.mutate(logId, {
      onSuccess: () => {
        setShowConfirm(false);
      },
      onError: (error) => {
        console.error('Error deleting log:', error);
        alert('Error deleting log. Please try again.');
      }
    });
  };

  if (!showConfirm) {
    return (
      <button
        onClick={() => setShowConfirm(true)}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
        title="Delete log"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={handleDelete}
        disabled={deleteLogMutation.isPending}
        className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700 disabled:bg-red-400 transition-colors"
      >
        {deleteLogMutation.isPending ? 'Deleting...' : 'Confirm'}
      </button>
      <button
        onClick={() => setShowConfirm(false)}
        disabled={deleteLogMutation.isPending}
        className="px-3 py-1 bg-gray-300 text-gray-700 text-xs font-semibold rounded hover:bg-gray-400 disabled:bg-gray-200 transition-colors"
      >
        Cancel
      </button>
    </div>
  );
};
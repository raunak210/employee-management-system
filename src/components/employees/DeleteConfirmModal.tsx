import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  employeeName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal = ({ isOpen, employeeName, onConfirm, onCancel }: DeleteConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Confirm Delete" size="sm">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Employee</h3>

        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete <span className="font-semibold">{employeeName}</span>? This action cannot be undone.
        </p>

        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

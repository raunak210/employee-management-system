import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEmployees } from '../../hooks/useEmployees';
import { EmployeeStats } from './EmployeeStats';
import { EmployeeList } from '../employees/EmployeeList';
import { EmployeeForm } from '../employees/EmployeeForm';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Loader } from '../common/Loader';
import { LogOut, UserPlus } from 'lucide-react';
import { Employee } from '../../types/employee';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const employeeHook = useEmployees();
  const { isLoading, getStats } = employeeHook;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsFormOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingEmployee(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Employee Management System</h1>
              <p className="text-sm text-gray-600 mt-1">Welcome back, {user?.name}</p>
            </div>
            <Button variant="ghost" onClick={logout} size="sm">
              <span className="flex items-center">
                <LogOut size={18} className="mr-2" />
                Logout
              </span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmployeeStats stats={stats} />

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Employees</h2>
            <Button onClick={handleAddEmployee}>
              <span className="flex items-center">
                <UserPlus size={20} className="mr-2" />
                Add Employee
              </span>
            </Button>
          </div>

          <EmployeeList employeeHook={employeeHook} onEdit={handleEditEmployee} />
        </div>
      </main>

      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingEmployee ? 'Edit Employee' : 'Add New Employee'}
        size="lg"
      >
        <EmployeeForm
          employee={editingEmployee}
          onSuccess={handleCloseForm}
          onCancel={handleCloseForm}
          employeeHook={employeeHook}
        />
      </Modal>
    </div>
  );
};

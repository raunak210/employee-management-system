import { useState, useMemo } from 'react';
import { Employee, EmployeeFilters } from '../../types/employee';
import { EmployeeTable } from './EmployeeTable';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { EmptyState } from '../common/EmptyState';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Search, Filter, Printer, UserPlus } from 'lucide-react';
import { TableSkeleton } from '../common/Loader';

interface EmployeeListProps {
  employeeHook: {
    employees: Employee[];
    isLoading: boolean;
    deleteEmployee: (id: string) => boolean;
    toggleEmployeeStatus: (id: string) => boolean;
  };
  onEdit: (employee: Employee) => void;
}

export const EmployeeList = ({ employeeHook, onEdit }: EmployeeListProps) => {
  const { employees, isLoading, deleteEmployee, toggleEmployeeStatus } = employeeHook;

  const [filters, setFilters] = useState<EmployeeFilters>({
    search: '',
    gender: '',
    status: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; employee: Employee | null }>({
    isOpen: false,
    employee: null,
  });

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch = employee.fullName.toLowerCase().includes(filters.search.toLowerCase());

      const matchesGender = filters.gender ? employee.gender === filters.gender : true;

      const matchesStatus =
        filters.status === 'active'
          ? employee.isActive
          : filters.status === 'inactive'
          ? !employee.isActive
          : true;

      return matchesSearch && matchesGender && matchesStatus;
    });
  }, [employees, filters]);

  const handleDelete = (employee: Employee) => {
    setDeleteModal({ isOpen: true, employee });
  };

  const confirmDelete = () => {
    if (deleteModal.employee) {
      deleteEmployee(deleteModal.employee.id);
      setDeleteModal({ isOpen: false, employee: null });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const clearFilters = () => {
    setFilters({ search: '', gender: '', status: '' });
  };

  const hasActiveFilters = filters.search || filters.gender || filters.status;

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (employees.length === 0) {
    return (
      <EmptyState
        title="No employees yet"
        description="Get started by adding your first employee to the system."
        action={
          <Button onClick={() => onEdit({} as Employee)}>
            <span className="flex items-center">
              <UserPlus size={20} className="mr-2" />
              Add First Employee
            </span>
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search by name..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setShowFilters(!showFilters)}>
            <span className="flex items-center">
              <Filter size={20} className="mr-2" />
              Filters
              {hasActiveFilters && <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">•</span>}
            </span>
          </Button>

          <Button variant="secondary" onClick={handlePrint} className="print:hidden">
            <span className="flex items-center">
              <Printer size={20} className="mr-2" />
              Print
            </span>
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 print:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Gender"
              value={filters.gender}
              onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'Other', label: 'Other' },
              ]}
            />

            <Select
              label="Status"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
            />

            <div className="flex items-end">
              <Button variant="ghost" onClick={clearFilters} className="w-full">
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {filteredEmployees.length === 0 ? (
        <EmptyState
          title="No employees found"
          description="Try adjusting your search or filter criteria."
          action={
            hasActiveFilters ? (
              <Button variant="secondary" onClick={clearFilters}>
                Clear Filters
              </Button>
            ) : undefined
          }
        />
      ) : (
        <>
          <div className="text-sm text-gray-600 mb-2">
            Showing {filteredEmployees.length} of {employees.length} employees
          </div>
          <EmployeeTable
            employees={filteredEmployees}
            onEdit={onEdit}
            onDelete={handleDelete}
            onToggleStatus={toggleEmployeeStatus}
          />
        </>
      )}

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        employeeName={deleteModal.employee?.fullName || ''}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, employee: null })}
      />
    </div>
  );
};

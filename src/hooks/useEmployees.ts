import { useState, useEffect, useCallback } from 'react';
import { Employee, EmployeeFormData, EmployeeStats } from '../types/employee';
import { storage } from '../utils/storage';
import { generateMockEmployees } from '../utils/mockData';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEmployees = () => {
      const storedEmployees = storage.getEmployees();
      if (storedEmployees.length === 0) {
        const mockEmployees = generateMockEmployees();
        storage.saveEmployees(mockEmployees);
        setEmployees(mockEmployees);
      } else {
        setEmployees(storedEmployees);
      }
      setIsLoading(false);
    };

    loadEmployees();
  }, []);

  const addEmployee = useCallback((formData: EmployeeFormData): Employee => {
    const newEmployee: Employee = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    storage.saveEmployees(updatedEmployees);

    return newEmployee;
  }, [employees]);

  const updateEmployee = useCallback((id: string, formData: EmployeeFormData): Employee | null => {
    const index = employees.findIndex((emp) => emp.id === id);
    if (index === -1) return null;

    const updatedEmployee: Employee = {
      ...employees[index],
      ...formData,
      updatedAt: new Date().toISOString(),
    };

    const updatedEmployees = [...employees];
    updatedEmployees[index] = updatedEmployee;

    setEmployees(updatedEmployees);
    storage.saveEmployees(updatedEmployees);

    return updatedEmployee;
  }, [employees]);

  const deleteEmployee = useCallback((id: string): boolean => {
    const updatedEmployees = employees.filter((emp) => emp.id !== id);
    setEmployees(updatedEmployees);
    storage.saveEmployees(updatedEmployees);
    return true;
  }, [employees]);

  const toggleEmployeeStatus = useCallback((id: string): boolean => {
    const index = employees.findIndex((emp) => emp.id === id);
    if (index === -1) return false;

    const updatedEmployees = [...employees];
    updatedEmployees[index] = {
      ...updatedEmployees[index],
      isActive: !updatedEmployees[index].isActive,
      updatedAt: new Date().toISOString(),
    };

    setEmployees(updatedEmployees);
    storage.saveEmployees(updatedEmployees);
    return true;
  }, [employees]);

  const getEmployeeById = useCallback((id: string): Employee | undefined => {
    return employees.find((emp) => emp.id === id);
  }, [employees]);

  const getStats = useCallback((): EmployeeStats => {
    const active = employees.filter((emp) => emp.isActive).length;
    return {
      total: employees.length,
      active,
      inactive: employees.length - active,
    };
  }, [employees]);

  return {
    employees,
    isLoading,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    toggleEmployeeStatus,
    getEmployeeById,
    getStats,
  };
};

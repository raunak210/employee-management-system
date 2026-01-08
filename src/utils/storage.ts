import { Employee } from '../types/employee';
import { User } from '../types/auth';

const STORAGE_KEYS = {
  EMPLOYEES: 'ems_employees',
  AUTH_USER: 'ems_auth_user',
};

export const storage = {
  getEmployees: (): Employee[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading employees from storage:', error);
      return [];
    }
  },

  saveEmployees: (employees: Employee[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
    } catch (error) {
      console.error('Error saving employees to storage:', error);
    }
  },

  getAuthUser: (): User | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading auth user from storage:', error);
      return null;
    }
  },

  saveAuthUser: (user: User | null): void => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
      }
    } catch (error) {
      console.error('Error saving auth user to storage:', error);
    }
  },

  clearAll: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.EMPLOYEES);
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};

export interface Employee {
  id: string;
  fullName: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  profileImage: string;
  state: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeFormData {
  fullName: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  profileImage: string;
  state: string;
  isActive: boolean;
}

export interface EmployeeFilters {
  search: string;
  gender: string;
  status: string;
}

export interface EmployeeStats {
  total: number;
  active: number;
  inactive: number;
}
  
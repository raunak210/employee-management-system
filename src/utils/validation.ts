export interface ValidationErrors {
    fullName?: string;
    gender?: string;
    dateOfBirth?: string;
    state?: string;
    profileImage?: string;
  }
  
  export const validateEmployeeForm = (data: {
    fullName: string;
    gender: string;
    dateOfBirth: string;
    state: string;
  }): ValidationErrors => {
    const errors: ValidationErrors = {};
  
    if (!data.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (data.fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters';
    } else if (data.fullName.trim().length > 100) {
      errors.fullName = 'Full name must not exceed 100 characters';
    }
  
    if (!data.gender) {
      errors.gender = 'Gender is required';
    }
  
    if (!data.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    } else {
      const dob = new Date(data.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
  
      if (dob > today) {
        errors.dateOfBirth = 'Date of birth cannot be in the future';
      } else if (age > 100) {
        errors.dateOfBirth = 'Please enter a valid date of birth';
      } else if (age < 16) {
        errors.dateOfBirth = 'Employee must be at least 16 years old';
      }
    }
  
    if (!data.state) {
      errors.state = 'State is required';
    }
  
    return errors;
  };
  
  export const validateLoginForm = (email: string, password: string): { email?: string; password?: string } => {
    const errors: { email?: string; password?: string } = {};
  
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
  
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 4) {
      errors.password = 'Password must be at least 4 characters';
    }
  
    return errors;
  };
  
  export const isValidImageFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024;
  
    return validTypes.includes(file.type) && file.size <= maxSize;
  };
  
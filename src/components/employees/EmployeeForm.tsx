import { useState, useEffect, ChangeEvent } from 'react';
import { Employee, EmployeeFormData } from '../../types/employee';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { validateEmployeeForm, isValidImageFile, ValidationErrors } from '../../utils/validation';
import { INDIAN_STATES } from '../../utils/mockData';
import { Upload, X } from 'lucide-react';

interface EmployeeFormProps {
  employee: Employee | null;
  onSuccess: () => void;
  onCancel: () => void;
  employeeHook: {
    addEmployee: (data: EmployeeFormData) => Employee;
    updateEmployee: (id: string, data: EmployeeFormData) => Employee | null;
  };
}

export const EmployeeForm = ({ employee, onSuccess, onCancel, employeeHook }: EmployeeFormProps) => {
  const isEditMode = !!employee?.id;

  const [formData, setFormData] = useState<EmployeeFormData>({
    fullName: '',
    gender: 'Male',
    dateOfBirth: '',
    profileImage: '',
    state: '',
    isActive: true,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (employee?.id) {
      setFormData({
        fullName: employee.fullName,
        gender: employee.gender,
        dateOfBirth: employee.dateOfBirth,
        profileImage: employee.profileImage,
        state: employee.state,
        isActive: employee.isActive,
      });
      setImagePreview(employee.profileImage);
    }
  }, [employee]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageError('');

    if (!file) return;

    if (!isValidImageFile(file)) {
      setImageError('Please upload a valid image file (JPG, PNG, GIF, WebP) under 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setFormData((prev) => ({ ...prev, profileImage: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview('');
    setImageError('');
    setFormData((prev) => ({ ...prev, profileImage: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateEmployeeForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    try {
      if (isEditMode && employee?.id) {
        employeeHook.updateEmployee(employee.id, formData);
      } else {
        employeeHook.addEmployee(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving employee:', error);
      setIsSubmitting(false);
    }
  };

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];

  const stateOptions = INDIAN_STATES.map((state) => ({ value: state, label: state }));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
            placeholder="Enter full name"
            required
          />
        </div>

        <Select
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          error={errors.gender}
          options={genderOptions}
          required
        />

        <Input
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          error={errors.dateOfBirth}
          required
        />

        <div className="md:col-span-2">
          <Select
            label="State"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            error={errors.state}
            options={stateOptions}
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Image
          </label>

          {imagePreview ? (
            <div className="relative inline-block">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                <p className="mb-1 text-sm text-gray-600">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP (MAX. 5MB)</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          )}

          {imageError && <p className="mt-1 text-sm text-red-600">{imageError}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Active Employee</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {isEditMode ? 'Update Employee' : 'Add Employee'}
        </Button>
      </div>
    </form>
  );
};

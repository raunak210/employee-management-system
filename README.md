# Employee Management System

A modern, full-featured Employee Management System built with React, TypeScript, and Tailwind CSS. This application provides a complete solution for managing employee data with authentication, CRUD operations, filtering, and local storage persistence.

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Project Flow](#project-flow)
- [Key Components](#key-components)
- [Scripts](#scripts)

## ✨ Features

- **Authentication System**
  - Secure login with mock credentials
  - Session persistence using localStorage
  - Protected routes and dashboard access

- **Employee Management**
  - ✅ Create new employees with full details
  - 📝 Edit existing employee information
  - 🗑️ Delete employees with confirmation
  - 👁️ View employee list in a beautiful table format
  - 🔄 Toggle employee active/inactive status

- **Advanced Filtering & Search**
  - Search employees by name
  - Filter by gender (Male, Female, Other)
  - Filter by status (Active, Inactive)
  - Real-time filtering with instant results

- **Employee Statistics Dashboard**
  - Total employees count
  - Active employees count
  - Inactive employees count
  - Visual cards with icons

- **Data Persistence**
  - All data stored in browser localStorage
  - Automatic data initialization with mock employees
  - Persistent across page reloads

- **User Experience**
  - Responsive design for mobile and desktop
  - Loading states and empty states
  - Form validation with error messages
  - Image upload support for profile pictures
  - Print-friendly layout

## 🛠️ Technologies Used

### Core Framework
- **React 19.2.0** - UI library with modern hooks
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Vite 7.2.4** - Fast build tool and dev server

### Styling
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **PostCSS 8.4.47** - CSS processing
- **Autoprefixer** - Automatic vendor prefixing

### UI Components & Icons
- **Lucide React 0.562.0** - Beautiful icon library
- Custom reusable components (Button, Input, Modal, Select, etc.)

### Development Tools
- **ESLint 9.39.1** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **React Hooks ESLint Plugin** - Hooks best practices

### Data Management
- **localStorage API** - Client-side data persistence
- React Context API - Global state management

## 📁 Project Structure

```
employee-management-system/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── auth/          # Authentication components
│   │   │   └── LoginPage.tsx
│   │   ├── common/        # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Loader.tsx
│   │   │   └── EmptyState.tsx
│   │   ├── dashboard/     # Dashboard components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── EmployeeStats.tsx
│   │   │   └── EmployeeState.tsx
│   │   └── employees/     # Employee management components
│   │       ├── EmployeeList.tsx
│   │       ├── EmployeeTable.tsx
│   │       ├── EmployeeForm.tsx
│   │       └── DeleteConfirmModal.tsx
│   ├── context/           # React Context providers
│   │   └── AuthContext.tsx
│   ├── hooks/             # Custom React hooks
│   │   └── useEmployees.ts
│   ├── types/             # TypeScript type definitions
│   │   ├── auth.ts
│   │   └── employee.ts
│   ├── utils/             # Utility functions
│   │   ├── storage.ts     # localStorage utilities
│   │   ├── validation.ts  # Form validation
│   │   └── mockData.ts    # Mock data generator
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── index.html
├── package.json
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173` (or the URL shown in terminal)

### Login Credentials

Use these default credentials to access the system:
- **Email**: `admin@company.com`
- **Password**: `admin123`

## 🔄 Project Flow

### 1. Application Initialization Flow

```
main.tsx
  ↓
App.tsx
  ↓
AuthProvider (Context)
  ↓
Checks localStorage for existing session
  ↓
AppContent Component
  ↓
Shows LoginPage OR Dashboard (based on auth state)
```

### 2. Authentication Flow

```
User visits app
  ↓
AuthContext checks localStorage for saved user
  ↓
If no user found → Show LoginPage
  ↓
User enters credentials
  ↓
LoginPage validates form
  ↓
Calls AuthContext.login()
  ↓
Compares with MOCK_CREDENTIALS
  ↓
If valid → Save user to localStorage → Navigate to Dashboard
  ↓
If invalid → Show error message
```

### 3. Employee Management Flow

```
Dashboard loads
  ↓
useEmployees hook initializes
  ↓
Checks localStorage for employees
  ↓
If empty → Generate mock employees → Save to localStorage
  ↓
Load employees into state
  ↓
Display EmployeeStats and EmployeeList
```

### 4. CRUD Operations Flow

#### Create Employee
```
User clicks "Add Employee" button
  ↓
Opens Modal with EmployeeForm
  ↓
User fills form (name, gender, DOB, state, image, status)
  ↓
Form validates input
  ↓
User submits form
  ↓
useEmployees.addEmployee() called
  ↓
New employee added to state
  ↓
Saved to localStorage
  ↓
Modal closes → List updates
```

#### Update Employee
```
User clicks Edit button on employee row
  ↓
Modal opens with pre-filled EmployeeForm
  ↓
User modifies data
  ↓
Form validates
  ↓
useEmployees.updateEmployee() called
  ↓
Employee updated in state and localStorage
  ↓
Modal closes → Table updates
```

#### Delete Employee
```
User clicks Delete button
  ↓
DeleteConfirmModal appears
  ↓
User confirms deletion
  ↓
useEmployees.deleteEmployee() called
  ↓
Employee removed from state and localStorage
  ↓
Modal closes → List updates
```

#### Toggle Status
```
User clicks status badge (Active/Inactive)
  ↓
useEmployees.toggleEmployeeStatus() called
  ↓
Status toggled in state
  ↓
Updated in localStorage
  ↓
Badge updates immediately
```

### 5. Filtering & Search Flow

```
User types in search box
  ↓
EmployeeList component filters employees
  ↓
Filters applied: search term, gender, status
  ↓
useMemo recalculates filteredEmployees
  ↓
EmployeeTable displays filtered results
  ↓
Shows count of filtered vs total employees
```

## 🧩 Key Components

### Authentication

#### `AuthContext.tsx`
- Manages authentication state globally
- Provides `login()`, `logout()`, and auth state
- Persists user session in localStorage
- Mock authentication system

#### `LoginPage.tsx`
- Login form with email and password fields
- Client-side validation
- Error handling and loading states
- Beautiful gradient design

### Dashboard

#### `Dashboard.tsx`
- Main application container after login
- Header with user info and logout button
- Integrates EmployeeStats and EmployeeList
- Manages employee form modal state

#### `EmployeeStats.tsx`
- Displays three stat cards: Total, Active, Inactive
- Receives stats from useEmployees hook
- Visual icons and color-coded cards

### Employee Management

#### `useEmployees.ts` (Custom Hook)
- Central state management for employees
- CRUD operations: add, update, delete, toggle status
- Statistics calculation
- localStorage synchronization

#### `EmployeeList.tsx`
- Container for employee table and filters
- Search input with icon
- Filter panel (gender, status)
- Empty states and loading states
- Print functionality

#### `EmployeeTable.tsx`
- Displays employees in responsive table
- Shows: ID, Profile Image, Name, Age, Gender, DOB, State, Status
- Action buttons: Edit, Delete
- Clickable status badges
- Calculates age from date of birth

#### `EmployeeForm.tsx`
- Form for creating/editing employees
- Fields: Full Name, Gender, Date of Birth, State, Profile Image, Active Status
- Image upload with preview
- Image validation (format, size)
- Form validation with error messages

### Common Components

#### `Button.tsx`
- Reusable button with variants: primary, secondary, danger, ghost
- Sizes: sm, md, lg
- Loading state support
- Disabled state handling

#### `Input.tsx`
- Text input with label and error display
- Forward ref support
- Custom styling with Tailwind

#### `Select.tsx`
- Dropdown select with options
- Label and error support
- Custom styling

#### `Modal.tsx`
- Reusable modal dialog
- Multiple sizes: sm, md, lg, xl
- Close button and backdrop click
- Body scroll lock when open

#### `Loader.tsx`
- Loading spinner component
- Used during data fetching

#### `EmptyState.tsx`
- Displays when no data available
- Customizable icon, title, description, and action button

### Utilities

#### `storage.ts`
- localStorage wrapper functions
- `getEmployees()` - Retrieve all employees
- `saveEmployees()` - Save employee array
- `getAuthUser()` - Get current user
- `saveAuthUser()` - Save/remove user
- Error handling for storage operations

#### `validation.ts`
- `validateLoginForm()` - Login form validation
- `validateEmployeeForm()` - Employee form validation
- `isValidImageFile()` - Image file validation

#### `mockData.ts`
- `MOCK_CREDENTIALS` - Default login credentials
- `INDIAN_STATES` - List of Indian states
- `generateMockEmployees()` - Creates sample employee data

## 📜 Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🎨 Styling Approach

- **Tailwind CSS** for utility-first styling
- **Responsive design** with mobile-first approach
- **Custom color scheme** using Tailwind defaults
- **Consistent spacing and typography** across components
- **Smooth transitions and hover effects**
- **Print-friendly** styles for employee table

## 🔐 Data Storage

All data is stored in the browser's localStorage:
- `ems_employees` - Employee data array
- `ems_auth_user` - Authenticated user data

Data persists across page reloads and browser sessions.

## 🚧 Future Enhancements

Potential improvements for the system:
- Backend API integration (currently uses localStorage)
- Real authentication with JWT tokens
- Pagination for large employee lists
- Export to CSV/PDF functionality
- Advanced search with multiple criteria
- Employee photo gallery
- Activity log/history
- Role-based access control
- Multi-language support

## 📝 Notes

- This is a frontend-only application using localStorage for data persistence
- Authentication is mocked with hardcoded credentials
- All validation is performed client-side
- The application is optimized for modern browsers
- Uses React 19 with latest features and hooks

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is private and intended for assignment purposes.
# employee-management-system

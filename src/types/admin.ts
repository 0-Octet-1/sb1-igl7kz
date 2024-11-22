export interface AdminSettings {
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  maxUsersPerCourse: number;
}

export interface CourseManagement {
  id: string;
  title: string;
  status: 'draft' | 'published' | 'archived';
  createdBy: string;
  lastModified: Date;
  publishDate?: Date;
}

export interface UserManagement {
  id: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'suspended' | 'banned';
  registrationDate: Date;
  lastActive: Date;
}
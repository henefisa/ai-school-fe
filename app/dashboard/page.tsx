'use client';

import { useAuth } from '@/contexts/auth-context';
import AdminDashboard from '@/components/dashboards/admin-dashboard';
import TeacherDashboard from '@/components/dashboards/teacher-dashboard';
import ParentDashboard from '@/components/dashboards/parent-dashboard';
import StudentDashboard from '@/components/dashboards/student-dashboard';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  // Render different dashboard based on user role
  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'parent':
      return <ParentDashboard />;
    case 'student':
      return <StudentDashboard />;
    default:
      return <div>Unknown role</div>;
  }
}

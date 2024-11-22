import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navigation from './components/Navigation';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import OfflineIndicator from './components/auth/OfflineIndicator';
import { queryClient } from './lib/react-query';

// Pages
import Home from './pages/Home';
import Cockpit from './pages/Cockpit';
import Systems from './pages/Systems';
import Procedures from './pages/Procedures';
import Courses from './pages/formations/Courses';
import CourseDetails from './pages/formations/CourseDetails';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ResetPassword from './pages/auth/ResetPassword';
import Profile from './pages/user/Profile';
import Dashboard from './pages/user/Dashboard';
import Settings from './pages/user/Settings';
import Certificates from './pages/user/Certificates';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import CourseList from './pages/admin/courses/CourseList';
import CourseForm from './pages/admin/courses/CourseForm';
import AdminStats from './pages/admin/Stats';
import AdminSettings from './pages/admin/Settings';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
          <div className="min-h-screen flex flex-col bg-background text-primary">
            <Navigation />
            <main className="flex-grow pt-16">
              <Routes>
                {/* Pages publiques */}
                <Route path="/" element={<Home />} />
                <Route path="/cockpit" element={<Cockpit />} />
                <Route path="/systems" element={<Systems />} />
                <Route path="/procedures" element={<Procedures />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:courseId" element={<CourseDetails />} />
                
                {/* Authentification */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />

                {/* Pages utilisateur protégées */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path="/certificates" element={
                  <ProtectedRoute>
                    <Certificates />
                  </ProtectedRoute>
                } />

                {/* Pages admin protégées */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/admin/users" element={
                  <AdminRoute>
                    <AdminUsers />
                  </AdminRoute>
                } />
                <Route path="/admin/courses" element={
                  <AdminRoute>
                    <CourseList />
                  </AdminRoute>
                } />
                <Route path="/admin/courses/new" element={
                  <AdminRoute>
                    <CourseForm />
                  </AdminRoute>
                } />
                <Route path="/admin/courses/:id/edit" element={
                  <AdminRoute>
                    <CourseForm />
                  </AdminRoute>
                } />
                <Route path="/admin/stats" element={
                  <AdminRoute>
                    <AdminStats />
                  </AdminRoute>
                } />
                <Route path="/admin/settings" element={
                  <AdminRoute>
                    <AdminSettings />
                  </AdminRoute>
                } />
              </Routes>
            </main>
            <Footer />
            <OfflineIndicator />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}
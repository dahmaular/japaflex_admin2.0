import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import LoginPage from "./pages/authentication/loginPage";

// Import dashboard pages
import Dashboard from "./pages/dashboard";
import UserManagement from "./pages/dashboard/userManagement/index";
import AdminManagement from "./pages/dashboard/adminManagement/index";
import FlaggedUsers from "./pages/dashboard/userManagement/flaggedUser";
import SuspendedUsers from "./pages/dashboard/userManagement/suspendedUsers";
import CreateAdmin from "./pages/dashboard/adminManagement/createAdmin";
import CreateRoles from "./pages/dashboard/adminManagement/rolePer";
import UserProfile from "./pages/dashboard/userManagement/userProfile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes with DashboardLayout wrapper */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />

              {/* User Management Routes */}
              <Route
                path="/user-management/all-users"
                element={<UserManagement />}
              />
              <Route
                path="/user-management/flagged-users"
                element={<FlaggedUsers />}
              />
              <Route
                path="/user-management/suspended-users"
                element={<SuspendedUsers />}
              />
              <Route
                path="/user-management/user-profile/:userId"
                element={<UserProfile />}
              />

              {/* Admin Management */}
              <Route path="/admin-management" element={<AdminManagement />} />
              <Route
                path="/admin-management/create"
                element={<CreateAdmin />}
              />
              <Route
                path="/admin-management/roles-permissions"
                element={<CreateRoles />}
              />

              {/* Features Routes */}
              <Route
                path="/features/group-communities"
                element={<div>Group & Communities</div>}
              />
              <Route path="/features/hub" element={<div>Hub</div>} />
              <Route path="/features/forum" element={<div>Forum</div>} />

              {/* Other main routes */}
              <Route
                path="/ads-management"
                element={<div>ADS Management</div>}
              />
              <Route
                path="/content-management"
                element={<div>Content Management</div>}
              />
              <Route path="/analytics" element={<div>Analytics</div>} />
              <Route
                path="/system-settings"
                element={<div>System Settings</div>}
              />

              {/* Communication Routes */}
              <Route path="/communication/email" element={<div>Email</div>} />
              <Route
                path="/communication/notifications"
                element={<div>Notifications</div>}
              />
              <Route path="/communication/chat" element={<div>Chat</div>} />
            </Route>
          </Route>

          {/* Redirect root to dashboard if authenticated, otherwise to login */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Catch all for 404 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

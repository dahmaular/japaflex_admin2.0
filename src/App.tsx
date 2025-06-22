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
import AdsManagement from "./pages/dashboard/adsManagement/AdsManagement";
import CreateAdd from "./pages/dashboard/adsManagement";
import EmailPage from "./pages/dashboard/email";
import AnalyticsPage from "./pages/dashboard/analytics";
import GroupCommunitiesPage from "./pages/dashboard/group-communities";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
              <Route path="/features/group-communities" element={<GroupCommunitiesPage />} />
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

              <Route path="/admin-management" element={<AdminManagement />} />
              <Route
                path="/admin-management/create"
                element={<CreateAdmin />}
              />
              <Route
                path="/admin-management/roles-permissions"
                element={<CreateRoles />}
              />

              <Route
                path="/features/group-communities"
                element={<div>Group & Communities</div>}
              />
              <Route path="/features/hub" element={<div>Hub</div>} />
              <Route path="/features/forum" element={<div>Forum</div>} />

              <Route path="/ads-management" element={<CreateAdd />} />
              <Route
                path="/ads-management/create"
                element={<AdsManagement />}
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

              <Route path="/communication/email" element={<EmailPage />} />
              <Route
                path="/communication/notifications"
                element={<div>Notifications</div>}
              />
              <Route path="/communication/chat" element={<div>Chat</div>} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

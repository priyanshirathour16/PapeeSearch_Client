import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import './App.css';

// Lazy loading components
const Login = lazy(() => import('./pages/Login'));
const DashboardLayout = lazy(() => import('./components/DashboardLayout'));
const ViewJournal = lazy(() => import('./pages/ViewJournal'));
const JournalDetails = lazy(() => import('./pages/JournalDetails'));
const ViewJournalIssues = lazy(() => import('./pages/ViewJournalIssues'));
const AddJournalIssue = lazy(() => import('./pages/AddJournalIssue'));
const JournalIssueDetails = lazy(() => import('./pages/JournalIssueDetails'));
const Unauthorized = lazy(() => import('./pages/Unauthorized'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<div className="p-4">Welcome to Dashboard</div>} />
              <Route path="view-journal" element={<ViewJournal />} />
              <Route path="view-journal/:id" element={<JournalDetails />} />
              <Route path="journal-issues" element={<ViewJournalIssues />} />
              <Route path="journal-issues/add" element={<AddJournalIssue />} />
              <Route path="journal-issues/:id" element={<JournalIssueDetails />} />
            </Route>
          </Route>

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

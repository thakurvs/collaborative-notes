import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store/store';
import { selectIsAuthenticated } from './features/auth/authSlice';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Notes/Dashboard';
import NoteEditor from './pages/Notes/NoteEditor';
import SharedNotes from './pages/Notes/Shared';
import MainLayout from './pages/Layout/MainLayout';
import AuthLayout from './pages/Layout/AuthLayout';

const AppRoutes: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/notes" /> : <Navigate to="/login" />}
      />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/notes" element={<Dashboard />} />
        <Route path="/notes/new" element={<NoteEditor />} />
        <Route path="/notes/:id" element={<NoteEditor />} />
        <Route path="/shared" element={<SharedNotes />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
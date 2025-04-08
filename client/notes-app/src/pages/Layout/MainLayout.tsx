import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { logout, selectCurrentUser } from '../../features/auth/authSlice';

const MainLayout: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Collaborative Notes
          </Typography>
          {user && (
            <>
              <Typography sx={{ mr: 2 }}>{user.email}</Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
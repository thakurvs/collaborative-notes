import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import NotesList from '../../components/NotesList';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">My Notes</Typography>
        <Button component={Link} to="/notes/new" variant="contained">
          Create New Note
        </Button>
      </Box>
      <NotesList />
    </Box>
  );
};

export default Dashboard;
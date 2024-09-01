import { Button } from '@mui/material';
import React from 'react';
import { axiosAuthCheker, axiosLogout } from '../API/Api';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axiosLogout().then(() => navigate('/signIn'));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button
      variant="contained"
      onClick={logout}
      sx={{ marginTop: '10px', marginRight: '10px', alignSelf: 'flex-end' }}
    >
      Logout
    </Button>
  );
};

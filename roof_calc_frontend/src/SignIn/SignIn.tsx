import React, { useState } from 'react';
import { Login } from './login/Login';
import { Registration } from './registration/Registration';
import { Stack, Switch, Typography } from '@mui/material';

export const SignIn = () => {
  const [handleSwitch, setHandleSwitch] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHandleSwitch(event.target.checked);
  };
  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ justifyContent: 'center', marginTop: '20px' }}
      >
        <Typography>Логинизация</Typography>
        <Switch id="loginSwitcher" onChange={handleChange} />
        <Typography>Регистрация</Typography>
      </Stack>
      {handleSwitch ? <Registration /> : <Login />}
    </>
  );
};

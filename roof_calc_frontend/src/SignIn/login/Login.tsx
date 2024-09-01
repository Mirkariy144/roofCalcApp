import {
  Box,
  Button,
  Card,
  CardActions,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { axiosLogin } from '../../shared/API/Api';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'login') {
      setLogin(event.target.value);
    } else if (event.target.id === 'password') {
      setPassword(event.target.value);
    }
  };

  const loginButton = async (login: string, password: string) => {
    try {
      const response = await axiosLogin(login, password);
      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{ width: '500px', height: '250px', margin: '0 auto' }}
    >
      <Box
        component="form"
        noValidate
        display={'flex'}
        flexDirection={'column'}
        width={'70%'}
        margin={'0 auto'}
      >
        <Typography variant="h5" color="text.primary" margin={'20px 0 10px 0'}>
          Регистрация пользователя
        </Typography>
        <TextField
          required
          type="text"
          id="login"
          value={login}
          onChange={handleChange}
          label="Введите ваш логин"
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          required
          type="password"
          id="password"
          value={password}
          onChange={handleChange}
          label="Введите ваш пароль"
          sx={{ marginBottom: '10px' }}
        />
      </Box>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button variant="outlined" onClick={() => loginButton(login, password)}>
          Войти
        </Button>
      </CardActions>
    </Card>
  );
};

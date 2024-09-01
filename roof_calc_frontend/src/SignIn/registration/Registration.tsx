import {
  Box,
  Button,
  Card,
  CardActions,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { axiosRegistration } from '../../shared/API/Api';

export const Registration = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  console.log(emailError);

  const validateEmail = (text: string) => {
    const re = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    if (re.test(text)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'email') {
      setEmail(event.target.value);
      validateEmail(event.target.value);
    } else if (event.target.id === 'login') {
      setLogin(event.target.value);
    } else if (event.target.id === 'password') {
      setPassword(event.target.value);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{ width: '500px', height: '350px', margin: '0 auto' }}
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
          type="email"
          id="email"
          label="Введите ваш email"
          value={email}
          onChange={handleChange}
          sx={{ marginBottom: '10px' }}
          error={email ? !emailError : false}
          helperText={emailError ? ' ' : 'Некорректный email'}
        />
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
        <Button
          variant="outlined"
          disabled={!emailError || !login || !password}
          onClick={() => axiosRegistration(email, login, password)}
        >
          Зарегистрироваться
        </Button>
      </CardActions>
    </Card>
  );
};

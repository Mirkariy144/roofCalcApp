import {
  Box,
  Button,
  Card,
  CardActions,
  TextField,
  Typography,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { axiosRegistration } from '../../shared/API/Api';
import { AxiosError } from 'axios';
import { RegistrationSuccessModal } from '../../shared/Modal/RegistrationSuccessModal/RegistrationSuccessModal';

export const Registration = ({
  handleSwitch,
}: {
  handleSwitch: Dispatch<SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [responseErrorData, setResponseErrorData] = useState<any>('');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  console.log(responseErrorData);

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

  const registration = async () => {
    try {
      const response = await axiosRegistration(email, login, password);
      if (response.status === 201) {
        setDialogOpen(true);
      }
    } catch (error) {
      const errorAsAxiosError = error as AxiosError;
      setResponseErrorData(errorAsAxiosError.response?.data);
      console.error(error);
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
          helperText={
            emailError
              ? responseErrorData === 'Email already exists'
                ? 'Данный Email уже зарегистрирован'
                : ''
              : 'Некорректный email'
          }
        />
        <TextField
          required
          type="text"
          id="login"
          value={login}
          onChange={handleChange}
          label="Введите ваш логин"
          sx={{ marginBottom: '10px' }}
          helperText={
            responseErrorData === 'Login already exists'
              ? 'Данный логин уже зарегистрирован'
              : ''
          }
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
          onClick={registration}
        >
          Зарегистрироваться
        </Button>
      </CardActions>
      <RegistrationSuccessModal
        status={dialogOpen}
        handleSwitch={handleSwitch}
        setDialogOpen={setDialogOpen}
      />
    </Card>
  );
};

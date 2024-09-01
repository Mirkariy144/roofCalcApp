const pool = require('../../data/config');
const jwt = require('jsonwebtoken');

const loginRoutes = (app) => {
  app.post('/registration', (request, response) => {
    pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
      const userId = result.insertId;
      if (error) throw error;
      response.status(201).send(`User added with ID: ${userId}`);
      return;
    });
  });

  // Аутентификация юзеров
  app.post('/login', (request, response) => {
    const { login, password } = request.body;
    pool.query(
      'SELECT * FROM users WHERE login = ? AND password = ?',
      [login, password],
      (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
          const token = jwt.sign(
            { userId: result[0].userId },
            'Пошёл ты на хуй мусор, я драм энд бэйс продюссер',
            { expiresIn: '1h' },
          );
          // response.json({ token });
          response
            .cookie('token', token, {
              httpOnly: true,
              maxAge: 3600000,
              SameSite: true,
            })
            .send('Login successful');
          return;
        } else {
          response.status(401).send('Invalid login or password');
          return;
        }
      },
    );
  });

  // выход из приложения

  app.post('/logout', (request, response) => {
    response
      .clearCookie('token', { httpOnly: true, SameSite: true })
      .send('Logout successful')
      .status(200);
  });

  // Проверка аутентификации пользователя и доступа к ресурсам

  app.post('/auth', (request, response) => {
    pool.query(
      'SELECT * FROM users WHERE userId = ?',
      request.userId,
      (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
          response.status(200).send(`Юзер найден по ID ${result[0].userId}`);
          return;
        } else {
          response.status(401).send('Invalid login or password');
          return;
        }
      },
    );
  });
};

module.exports = loginRoutes;

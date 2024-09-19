const bodyParser = require('body-parser');
const routes = require('./src/routes/routes');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const express = require('express');
const cors = require('cors');
const port = 3001;
const app = express();

const allowedOrigins = ['http://localhost:3000', 'http://87.228.8.13', 'mirkariy-roofcalc.online']

app.use(cors(
  {
    origin: 'https://api.mirkariy-roofcalc.online',
    credentials: true
  }
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {

  // Проверка аутентификации пользователя и доступа к ресурсам

  if (req.url === '/login' || req.url === '/registration') {
    next()
  } else {
    // const token = req.headers.authorization
    const token = req.cookies.token
    if (!token) {
      res.status(401).send('Unauthorized')
      return
    }
    const decoded =  jwt.verify(token, 'Пошёл ты на хуй мусор, я драм энд бэйс продюссер')
    if (!decoded) {
      res.status(401).send('Invalid token');
      return
    }

    req.userId = decoded.userId
    next()
  }
})


routes(app)
const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server listening on port ${server.address().port}`);
});
const loginRoutes = require('../routes/Login/loginRoutes');
const projectsRoutes = require('../routes/Projects/projectsRoutes');
const projectQueueRoutes = require('./ProjectQueue/projectQueueRoutes');
const roofLayersRoutes = require('./RoofLayers/roofLayersRoutes');
const sectionsRoutes = require('./Section/sectionsRoutes');

// Верификация токена

const router = (app) => {
  // Регистрация, вход и аутентификация юзеров
  loginRoutes(app);

  // Создание, получение и обновление проектов
  projectsRoutes(app);

  // Тупо поиск очередей
  projectQueueRoutes(app);

  // Тупа секции!
  sectionsRoutes(app);

  // API кровельное
  roofLayersRoutes(app);
};

module.exports = router;

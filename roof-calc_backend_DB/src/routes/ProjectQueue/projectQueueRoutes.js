const pool = require('../../data/config');

const projectQueueRoutes = (app) => {
  app.get('/projectqueue', (request, response) => {
    pool.query('SELECT * FROM projectqueue', (error, result) => {
      if (error) throw error;
      response.send(result);
      return;
    });
  });
  app.get('/projectqueue/:id', (request, response) => {
    const id = request.params.id;
    pool.query(
      'SELECT * FROM projectqueue WHERE projectId = ? AND userId = ?',
      [id, request.userId],
      (error, result) => {
        if (error) throw error;
        response.send(result);
        return;
      },
    );
  });
  app.post('/projectqueue', (request, response) => {
    request.body.userId = request.userId;
    pool.query(
      'INSERT INTO projectqueue SET ?',
      request.body,
      (error, result) => {
        if (error) throw error;
        response.status(201).send(`Queue added with ID: ${result.insertId}`);
        return;
      },
    );
  });
  app.put('/projectqueue/:id', (request, response) => {
    const id = request.params.id;
    pool.query(
      'UPDATE projectqueue SET ? WHERE queueId = ? AND userId = ?',
      [request.body, id, request.userId],
      (error, result) => {
        if (error) throw error;
        response.send('Queue updated successfully.');
        return;
      },
    );
  });
  app.delete('/projectqueue/:id', (request, response) => {
    const id = request.params.id;
    pool.query(
      'DELETE FROM projectqueue WHERE queueId = ? AND userId = ?',
      [id, request.userId],
      (error, result) => {
        if (error) throw error;
        response.send('Queue deleted.');
        return;
      },
    );
  });
};

module.exports = projectQueueRoutes;

const pool = require('../../data/config');

const sectionsRoutes = (app) => {
  app.get('/section', (request, response) => {
    pool.query('SELECT * FROM sections', (error, result) => {
      if (error) throw error;
      response.send(result);
      return;
    });
  });
  app.get('/section/:id', (request, response) => {
    const id = request.params.id;
    pool.query(
      'SELECT * FROM sections WHERE queueId = ? AND userId = ?',
      [id, request.userId],
      (error, result) => {
        if (error) throw error;
        response.send(result);
        return;
      },
    );
  });
  app.post('/section', (request, response) => {
    request.body.userId = request.userId;
    pool.query('INSERT INTO sections SET ?', request.body, (error, result) => {
      if (error) throw error;
      response.status(201).send(`Section added with ID: ${result.insertId}`);
      return;
    });
  });
  app.put('/section/:id', (request, response) => {
    const id = request.params.id;
    pool.query(
      'UPDATE sections SET ? WHERE sectionId = ? AND userId = ?',
      [request.body, id, request.userId],
      (error, result) => {
        if (error) throw error;
        response.send('Section updated successfully.');
        return;
      },
    );
  });
  app.delete('/section/:id', (request, response) => {
    const id = request.params.id;
    pool.query(
      'DELETE FROM sections WHERE sectionId = ? AND userId = ?',
      [id, request.userId],
      (error, result) => {
        if (error) throw error;
        response.send('Section deleted.');
        return;
      },
    );
  });
};

module.exports = sectionsRoutes;

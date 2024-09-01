const pool = require('../../data/config');

const projectsRoutes = (app) => {
  app.get('/projects', (request, response) => {
    pool.query(
      'SELECT * FROM projects WHERE userId = ?',
      request.userId,
      (error, result) => {
        if (error) throw error;
        response.send(result);
        return;
      },
    );
  });
  app.get('/projects/:id', (request, response) => {
    const id = request.params.id;
    pool.query(
      'SELECT * FROM projects WHERE projectId = ?',
      id,
      (error, result) => {
        if (error) throw error;
        response.send(result);
        return;
      },
    );
  });
  app.post('/projects', (request, response) => {
    const userId = request.userId;
    request.body.userId = userId;
    pool.query('INSERT INTO projects SET ?', request.body, (error, result) => {
      if (error) throw error;
      response.status(201).send(`Project added with ID: ${result.insertId}`);
      return;
    });
  });
  app.put('/projects/:id', (request, response) => {
    const id = request.params.id;
    pool.query(
      'UPDATE projects SET ? WHERE projectId = ? AND userId = ?',
      [request.body, id, request.userId],
      (error, result) => {
        if (error) throw error;
        response.send('Project updated successfully.');
        return;
      },
    );
  });
  app.delete('/projects/:id', (request, response) => {
    const id = request.params.id;
    pool.query(
      'DELETE FROM projects WHERE projectId = ? AND userId = ?',
      [id, request.userId],
      (error, result) => {
        if (error) throw error;
        response.send('Project deleted.');
        return;
      },
    );
  });
};

module.exports = projectsRoutes;

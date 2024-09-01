const pool = require('../../data/config');
const roofCalculator = require('../../data/roofCalculator');
const junctionCalculator = require('../../data/junctionCalculator');

const roofLayersRoutes = (app) => {
  app.get('/rooflist', (request, response) => {
    pool.query('SELECT * FROM rooflist', (error, result) => {
      if (error) throw error;
      result.map((item) => {
        let parsedData = JSON.parse(item.roofLayers);
        let dataArray = Object.values(parsedData);
        item.roofLayers = dataArray;
        if (item.junctionLayers) {
          let parsedJunctions = JSON.parse(item.junctionLayers);
          let dataArrayJunctions = Object.values(parsedJunctions);
          item.junctionLayers = dataArrayJunctions;
        }
        return item;
      });
      response.send(result);
      return;
    });
  });
  app.get('/rooflist/:id', (request, response) => {
    const id = request.params.id;
    pool.query(
      'SELECT * FROM rooflist WHERE sectionId = ? AND userId = ?',
      [id, request.userId],
      (error, result) => {
        if (error) throw error;
        result.map((item) => {
          let parsedLayers = JSON.parse(item.roofLayers);
          let dataArrayLayers = Object.values(parsedLayers);
          item.roofLayers = dataArrayLayers;

          if (item.junctionLayers) {
            let parsedJunctions = JSON.parse(item.junctionLayers);
            let dataArrayJunctions = Object.values(parsedJunctions);
            item.junctionLayers = dataArrayJunctions;
          }

          return item;
        });
        response.send(result);
        return;
      },
    );
  });
  app.post('/rooflist', (request, response) => {
    let JSONinfo = roofCalculator(
      request.body.roofLayers,
      request.body.squareMeters,
      request.body.upperPoint,
      request.body.lowerPoint,
    );
    let requestBody = {
      name: request.body.name,
      projectId: request.body.projectId,
      queueId: request.body.queueId,
      sectionId: request.body.sectionId,
      roofLayers: JSONinfo,
      squareMeters: request.body.squareMeters,
      userId: request.userId,
    };
    pool.query('INSERT INTO rooflist SET ?', requestBody, (error, result) => {
      if (error) throw error;
      response.status(201).send(`New roof added with ID: ${result.insertId}`);
      return;
    });
  });
  app.put('/rooflist/:id', (request, response) => {
    const id = request.params.id;
    let JSONinfo = roofCalculator(
      request.body.roofLayers,
      request.body.squareMeters,
      request.body.upperPoint,
      request.body.lowerPoint,
    );
    let requestBody = {
      name: request.body.name,
      projectId: request.body.projectId,
      queueId: request.body.queueId,
      sectionId: request.body.sectionId,
      roofLayers: JSONinfo,
      squareMeters: request.body.squareMeters,
      userId: request.userId,
    };
    pool.query(
      'UPDATE rooflist SET ? WHERE roofId = ? AND userId = ?',
      [requestBody, id, request.userId],
      (error, result) => {
        if (error) throw error;
        response.send('Roof updated successfully.');
        return;
      },
    );
  });
  app.delete('/rooflist/:id', (request, response) => {
    const id = request.params.id;
    pool.query(
      'DELETE FROM rooflist WHERE roofId = ? AND userId = ?',
      [id, request.userId],
      (error, result) => {
        if (error) throw error;
        response.send('Roof deleted.');
        return;
      },
    );
  });

  app.post('/junctions/:id', (request, response) => {
    let junctions = request.body.junctions;
    pool.query(
      'SELECT * FROM rooflist WHERE roofId=? and userId=?',
      [request.params.id, request.userId],
      (error, result) => {
        if (error) throw error;
        const oldRoof = result.map((item) => {
          let parsedData = JSON.parse(item.roofLayers);
          let dataArray = Object.values(parsedData);
          item.roofLayers = dataArray;
          return item;
        })[0];

        const jSquareMeters = () => {
          let thickness = 0;
          junctions.map((item) => {
            if (item.thickness) {
              thickness += item.thickness;
            }
          });
          return thickness * request.body.junctionLength;
        };

        const newRoofLayers = roofCalculator(
          oldRoof.roofLayers,
          oldRoof.squareMeters - jSquareMeters(),
          23,
          3,
        );

        const newRoofData = {
          name: oldRoof.name,
          projectId: oldRoof.projectId,
          queueId: oldRoof.queueId,
          sectionId: oldRoof.sectionId,
          roofLayers: newRoofLayers,
          squareMeters: oldRoof.squareMeters - jSquareMeters(),
          userId: request.userId,
        };

        pool.query(
          'UPDATE rooflist SET ? WHERE roofId = ? AND userId = ?',
          [newRoofData, request.params.id, request.userId],
          (error, result) => {
            if (error) throw error;
          },
        );

        const JSONJunctions = junctionCalculator(
          junctions,
          request.body.junctionLength,
        );

        const junctionsData = {
          name: request.body.name,
          length: request.body.junctionLength,
          jSquareMeters: jSquareMeters(),
          junctionLayers: JSONJunctions,
          userId: request.userId,
          roofId: request.params.id,
        };

        pool.query(
          'INSERT INTO junctionlist SET ?',
          junctionsData,
          (error, result) => {
            if (error) throw error;
            response
              .status(201)
              .send(`New junction added with ID: ${result.insertId}`);
          },
        );
      },
    );
  });
  app.get('/junctions/:id', (request, response) => {
    pool.query(
      'SELECT * FROM junctionlist WHERE roofId = ? AND userId = ?',
      [request.params.id, request.userId],
      (error, result) => {
        if (error) throw error;

        result = result.map((item) => {
          let parsedData = JSON.parse(item.junctionLayers);
          let dataArray = Object.values(parsedData);
          item.junctionLayers = dataArray;
          return item;
        });

        response.send(result);
      },
    );
  });
  app.delete('/junctions/:id', (request, response) => {
    const id = request.params.id;

    pool.query(
      'SELECT * FROM junctionlist WHERE junctionId = ? AND userId = ?',
      [id, request.userId],
      (error, result) => {
        if (error) throw error;
        const junctionSquareMeters = result[0].jSquareMeters;
        const roofId = result[0].roofId;

        pool.query(
          'SELECT * FROM rooflist WHERE roofId=? and userId=?',
          [roofId, request.userId],
          (error, result) => {
            if (error) throw error;
            const oldRoof = result.map((item) => {
              let parsedData = JSON.parse(item.roofLayers);
              let dataArray = Object.values(parsedData);
              item.roofLayers = dataArray;
              return item;
            })[0];

            const newRoofLayers = roofCalculator(
              oldRoof.roofLayers,
              oldRoof.squareMeters + junctionSquareMeters,
              23,
              3,
            );

            const newRoofData = {
              name: oldRoof.name,
              projectId: oldRoof.projectId,
              queueId: oldRoof.queueId,
              sectionId: oldRoof.sectionId,
              roofLayers: newRoofLayers,
              squareMeters: oldRoof.squareMeters + junctionSquareMeters,
              userId: request.userId,
            };

            pool.query(
              'UPDATE rooflist SET ? WHERE roofId = ? AND userId = ?',
              [newRoofData, roofId, request.userId],
              (error, result) => {
                if (error) throw error;
              },
            );
          },
        );
      },
    );

    pool.query(
      'DELETE FROM junctionlist WHERE junctionId = ? AND userId = ?',
      [id, request.userId],
      (error, result) => {
        if (error) throw error;
        response.send('Junction deleted.');
        return;
      },
    );
  });
  app.put('/junctions/:id', (request, response) => {
    const id = request.params.id;
    console.log(1);
    pool.query(
      'SELECT * FROM junctionlist WHERE junctionId = ? AND userId = ?',
      [id, request.userId],
      (error, result) => {
        if (error) throw error;
        const junctionSquareMeters = result[0].jSquareMeters;
        const roofId = result[0].roofId;
        console.log(2);
        pool.query(
          'SELECT * FROM rooflist WHERE roofId=? and userId=?',
          [roofId, request.userId],
          (error, result) => {
            if (error) throw error;
            const oldRoof = result.map((item) => {
              let parsedData = JSON.parse(item.roofLayers);
              let dataArray = Object.values(parsedData);
              item.roofLayers = dataArray;
              return item;
            })[0];

            console.log(3);
            const jSquareMeters = () => {
              let thickness = 0;
              request.body.junctions.map((item) => {
                if (item.thickness) {
                  thickness += item.thickness;
                }
              });
              return thickness * request.body.junctionLength;
            };

            console.log(4);
            const newRoofLayers = roofCalculator(
              oldRoof.roofLayers,
              oldRoof.squareMeters + junctionSquareMeters - jSquareMeters(),
              23,
              3,
            );

            console.log(5);
            const newRoofData = {
              name: oldRoof.name,
              projectId: oldRoof.projectId,
              queueId: oldRoof.queueId,
              sectionId: oldRoof.sectionId,
              roofLayers: newRoofLayers,
              squareMeters:
                oldRoof.squareMeters + junctionSquareMeters - jSquareMeters(),
              userId: request.userId,
            };

            console.log(6);
            pool.query(
              'UPDATE rooflist SET ? WHERE roofId = ? AND userId = ?',
              [newRoofData, roofId, request.userId],
              (error, result) => {
                if (error) throw error;
              },
            );

            console.log(7);
            const JSONJunctions = junctionCalculator(
              request.body.junctions,
              request.body.junctionLength,
            );

            console.log(8);
            const junctionsData = {
              name: request.body.name,
              length: request.body.junctionLength,
              jSquareMeters: jSquareMeters(),
              junctionLayers: JSONJunctions,
              userId: request.userId,
            };

            console.log(9);
            pool.query(
              'UPDATE junctionlist SET ? WHERE junctionId = ? AND userId = ?',
              [junctionsData, request.params.id, request.userId],
              (error, result) => {
                if (error) throw error;
                response.send('Junction updated.');
              },
            );
          },
        );
      },
    );
  });
};

module.exports = roofLayersRoutes;

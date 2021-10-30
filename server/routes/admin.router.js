const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// TODO: GET route to retrieve all feedback given
router.get('/', (req, res) => {
  console.log('GET /admin');
  // build the SQL query
  let query = `
    SELECT * FROM "feedback";
  `;
  pool
    .query(query)
    .then((response) => {
      // send the necessary data, which is contained in response.rows
      res.send(response.rows);
    })
    .catch((err) => {
      console.log(`There was an error retrieving data from the database:`, err);
      res.sendStatus(500); // let the client know something went wrong
    });
});

// TODO: DELETE route to delete single feedback
router.delete('/:id', (req, res) => {
  console.log(`DELETE /${req.params.id}`);

  // build the SQL query
  let query = `
    DELETE FROM "feedback"
    WHERE "id" = $1;
  `;

  // parameterize the input
  let values = [req.params.id];

  // run the SQL query
  pool
    .query(query, values)
    .then((response) => {
      // send the client a no content response, indicating delete
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(`There was an error deleting data from the database:`, err);
      res.sendStatus(500); // let the client know something went wrong
    });
});

// TODO: PUT route to toggle flag
router.put('/:id', (req, res) => {
  console.log(`PUT /admin/${req.params.id}`);

  // build the SQL query
  let query = `
    UPDATE "feedback"
    SET "flagged" = NOT "flagged"
    WHERE "id" = $1;
  `;

  // parameterize the input
  let values = [req.params.id];

  // run the SQL query
  pool
    .query(query, values)
    .then((response) => {
      // send the client a 200 response, indicating update complete
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`There was an error updating data in the database:`, err);
      res.sendStatus(500); // let the client know something went wrong
    });
});

module.exports = router;

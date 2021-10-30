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
      console.log(`There was an error retrieving data from the databaes:`, err);
      res.sendStatus(500); // let the client know something went wrong
    });
});

// TODO: DELETE route to delete single feedback

// TODO: PUT route to toggle flag

module.exports = router;

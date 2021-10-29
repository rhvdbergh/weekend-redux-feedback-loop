// Router for the /submit route
const pool = require('../modules/pool.js');
const express = require('express');
const router = express.Router();

// POST request to add feedback to the db
router.use('/', (req, res) => {
  // build the SQL query
  let query = `
    INSERT INTO "feedback" ("feeling", "understanding", "support", "comments")
    VALUES ($1, $2, $3, $4);
  `;
  // parameterize input
  let values = [
    req.body.feeling,
    req.body.understanding,
    req.body.support,
    req.body.comments,
  ];
  pool
    .query(query, values)
    .then((response) => {
      res.sendStatus(201); // let the client know the db entry was created
    })
    .catch((err) => {
      console.log(`There was an error posting data to the databaes:`, err);
      res.sendStatus(500); // let the client know something went wrong
    });
});

module.exports = router;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const cors = require('cors');

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

// set up cors for use on Heroku
app.use(cors());

/** ---------- EXPRESS ROUTES ---------- **/

const submitRouter = require('./routes/submit.router.js');
app.use('/submit', submitRouter);

const adminRouter = require('./routes/admin.router.js');
app.use('/admin', adminRouter);

/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
  console.log('Listening on port: ', PORT);
});

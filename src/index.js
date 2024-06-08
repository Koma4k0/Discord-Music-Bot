const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Sound Wave is Online!');
});
app.listen(3000, () => {
  console.log('[INFO] Bot Online!');
});
const MainClient = require("./soundwave.js");
const client = new MainClient();

client.connect();

module.exports = client;

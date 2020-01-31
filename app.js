const express = require('express')
const ngrok = require('ngrok');
(async function() {
  const url = await ngrok.connect(8080)
  console.log(url)
})();
const app = express()
const port = process.env.PORT || 8080
app.post('/webhook', (req, res) => res.sendStatus(200))
app.listen(port)
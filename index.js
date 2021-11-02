const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const data = require("./routes/data.js")

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use("/data.js",data)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`[INFO] Listening on ${ PORT }`));

// https://codepen.io/bloom-dan/pen/dpbWRz

// dependencies
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

// server
const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(express.static('public'));

// database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/CrowdSheets');
const db = require('./models');

// routing
app.get('/:name', (req, res) => {
  const { name } = req.params;

  // check db for file

  // if it doesn't exist

  // scrape data
  axios.get(`https://codepen.io/pen/${name}`)
  .then(data => {
    const $ = cheerio.load(data.data);
    const code = $('#box-css code').text().trim();

    db.Snippet.create({
      name: name,
      code: code
    })

    res.setHeader('content-type', 'text/css');
    res.end(code);
  })

  // write file
  //fs.writeFileSync(file.path, 'styles')

  // send file
  //res.sendFile(path.join(__dirname, file.path))
})

// start server
app.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT)
})

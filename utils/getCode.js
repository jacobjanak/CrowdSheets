const axios = require('axios');
const cheerio = require('cheerio');
const sass = require('node-sass');
const db = require('../models');

function getCode(name, language) {
  return new Promise((resolve, reject) => {

    // check db for file
    db.Snippet.findOne({
      name: name,
      language: language
    })
    .then(snippet => {

      // if it's in the database just send it
      if (snippet) resolve(snippet.code);
      else {

        // scrape html
        axios.get(`https://codepen.io/pen/${name}`)
        .then(data => {
          const $ = cheerio.load(data.data);

          // get text from html
          const parent = language === 'css' ? '#box-css' : '#box-js';
          const code = $(`${parent} code`).text().trim();

          // if it's not JS then convert SASS to CSS
          if (language === 'css') {
            sass.render({
              data: code
            }, (err, compiled) => {

              // save and send
              db.Snippet.create({
                name: name,
                code: compiled.css,
                language: 'css'
              })
              .then(snippet => resolve(snippet.code))

            })
          } else {

            // save and send
            db.Snippet.create({
              name: name,
              code: code,
              language: 'javascript'
            })
            .then(snippet => resolve(snippet.code))

          }
        })
      }
    })
  })
}

module.exports = getCode;

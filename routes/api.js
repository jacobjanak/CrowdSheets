const router = require('express').Router();
const getCode = require('../utils/getCode');

router.get('/:name.css', (req, res) => {
  const name = req.params.name;
  getCode(name, 'css')
  .then(code => {
    res.setHeader('content-type', 'text/css');
    res.end(code);
  })
})

router.get('/:name.js', (req, res) => {
  const name = req.params.name;
  getCode(name, 'javascript')
  .then(code => {
    res.setHeader('content-type', 'application/javascript');
    res.end(code);
  })
})

module.exports = router;

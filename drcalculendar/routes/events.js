var express = require('express');
var router = express.Router();

/* get params*/
router.get('/', function(req, res, next) {
  res.json({"id":req.query.id,"message":"hello user"});
});

module.exports = router;

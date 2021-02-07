var express = require('express');
var router = express.Router();
var models = require('../models');

/* get params*/
router.get('/', function(req, res, next) {
  models.events.findOne({ where: { id: req.query.id } }).then(event => {
    res.json({"id":req.query.id,"name":event.name});  
  });
  
  //res.json({"id":req.query.id,"message":"hello user"});
});

module.exports = router;

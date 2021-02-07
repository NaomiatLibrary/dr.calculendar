var express = require('express');
var router = express.Router();
var models = require('../models');

/* get params*/
router.get('/', function(req, res, next) {
  let sum=0;
  models.data.findAll({ where: { eventid: req.query.id }}).then(data => {
    data.forEach(datum =>{
      sum+=datum.num;
    })
  })
  models.events.findByPk(req.query.id).then(event => {
    res.render('events', {"id":req.query.id,"name":event.name,"sum":sum});
  }).catch(err=>{
    console.log(err);
  });
  //res.json({"id":req.query.id,"message":"hello user"});
});

router.post('/', function(req, res, next) {
  let eventid=req.body.eventid;
  let num=req.body.num;
  //データベースにこれを入れる
  models.data.create({
    eventid:eventid,
    num:num
  }).then(message => {
    //データベースに入れるのに成功したらページを遷移せず成功と表示
    console.log(message);
  }).catch(err => {
    //失敗したらページを遷移せず警告を表示
    console.log(err);
  });
  res.redirect(req.baseUrl + '?id='+String(eventid));
});

module.exports = router;

var express = require('express');
var router = express.Router();
var models = require('../models');

/* get params*/
router.get('/', function(req, res, next) {
  let all_data=undefined;
  models.data.findAll({ where: { eventid: req.query.id }}).then(data => {
    all_data=data;
  })
  models.events.findOne({ where: { eventid: req.query.id }}).then(event => {
    res.render('events', {"event":event,"all_data":all_data});
  }).catch(err=>{
    console.log(err);
    res.redirect("/");
  });
  //res.json({"id":req.query.id,"message":"hello user"});
});

router.post('/', function(req, res, next) {
  let eventid=req.body.eventid;
  //データベースにこれを入れる
  models.data.create({
    eventid:eventid,
    name:req.body.name,
    url:req.body.url
  }).then(message => {
    //データベースに入れるのに成功したらページを遷移せず成功と表示
    console.log(message);
  }).catch(err => {
    //失敗したらページを遷移せず警告を表示
    console.log(err);
  });
  res.redirect(req.baseUrl + '?id='+String(eventid));
});

router.delete('/', function(req, res, next) {
  let eventid=req.body.eventid;
  let dataid=req.body.dataid;
  models.data.findByPk(dataid).then(data => {
    if(data.eventid==eventid){
      data.destroy();
    }
  }).catch(err=>{
    console.log(err);
  });
  res.redirect(req.baseUrl + '?id='+String(eventid));
});

module.exports = router;

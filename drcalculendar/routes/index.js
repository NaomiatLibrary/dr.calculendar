var express = require('express');
var router = express.Router();
var models = require('../models');
const crypto = require("crypto");
const Length = 40;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
function timetoint(text){
  const words=text.split(':');
  return 60*parseInt(words[0])+parseInt(words[1]);
}
router.post('/', function(req, res, next) {
  const _id = crypto.randomBytes(Length + 2).toString("base64");
  const id = _id.replace(/\W/g, '').substring(0, Length);
  console.log(req.body.firsttime)
  let firsttime=timetoint(req.body.firsttime);//ここで数字（分）に直す
  let lasttime=timetoint(req.body.lasttime);
  //データベースにこれを入れる
  models.events.create({
    name:req.body.name,
    eventid:id,
    firstdate: req.body.firstdate,
    lastdate: req.body.lastdate,
    duration: req.body.duration,
    firsttime: firsttime,
    lasttime: lasttime
  }).then(message => {
    //データベースに入れるのに成功したらページ遷移
    console.log(message);
    res.redirect(req.baseUrl + '/events?id='+String(message.eventid));
  }).catch(err => {
    //失敗したらページを遷移せず警告を表示
    // catch error if anything goes wrong
    console.log(err);
    res.render('index', { title: 'Express',error:err });
  });
});

module.exports = router;

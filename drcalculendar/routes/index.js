var express = require('express');
var router = express.Router();
var models = require('../models');
const crypto = require("crypto");
const Length = 40;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
async function sha256(text){
  const uint8  = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', uint8)
  return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('')
}
router.post('/', function(req, res, next) {
  console.log("hello");
  const _id = crypto.randomBytes(Length + 2).toString("base64");
  const id = _id.replace(/\W/g, '').substring(0, Length);
  //データベースにこれを入れる
  models.events.create({
    name:req.body.name,
    eventid:id,
    firstdate: req.body.firstdate,
    lastdate: req.body.lastdate,
    duration: req.body.duration,
    firsttime: req.body.firsttime,
    lasttime: req.body.lasttime
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

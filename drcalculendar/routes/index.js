var express = require('express');
var router = express.Router();

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
  //データベースにこれを入れる
  //データベースの次のidを取得
  let next_id=0;
  //それを元にハッシュ値を生成
  let hash=sha256(next_id);
  res.json({eventid:hash,name:req.body.name});
});

module.exports = router;

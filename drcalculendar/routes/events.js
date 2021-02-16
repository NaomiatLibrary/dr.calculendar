var express = require('express');
let https = require('https');
var router = express.Router();
var models = require('../models');

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = 'token.json';

function getschedules(address){
  return new Promise(function(callback) {
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Calendar API.
      authorize(JSON.parse(content), (auth)=>listEvents(auth,address,(item)=>{
        callback(item);
      }));
    });  
  });
}
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);
  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}


/**
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth,address,callback) {
  const calendar = google.calendar({version: 'v3', auth});
  var firstdate=(new Date()).toISOString();
  var dt=new Date();
  dt.setMonth(dt.getMonth() + 1);
  var lastdate=dt.toISOString();
  eventslist=[];
  calendar.events.list({
    calendarId: address,
    timeMin: firstdate,
    timeMax: lastdate,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err){
      console.log('The API returned an error: ' + err);
      callback(eventslist);
    }else{
      const events = res.data.items;
      if (events.length) {
        events.map((event, i) => {
          //const start = event.start.dateTime || event.start.date;
          //console.log(`${start} - ${event.summary}`);
          const eventdict={
            "startdate":event.start.date,
            "starttime":event.start.dateTime,
            "enddate":event.end.date,
            "endtime":event.end.dateTime,
          };
          eventslist.push(eventdict);
        });
        //console.log(address);
        //console.log(eventslist);
        callback(eventslist);
      } else {
        console.log('No upcoming events found.');
        callback(eventslist);
      }
    }
  });
}

router.get('/', function(req, res, next) {
  let all_data=[];
  let all_promise=[]
  let all_schedules=[];
  models.data.findAll({ where: { eventid: req.query.id }}).then(data => {
    all_data=data;
    data.forEach(datum => {
      all_promise.push(
        getschedules(datum.url).then((item)=>{
          console.log(datum.url);
          all_schedules=all_schedules.concat(item);
        })
      );
    });
  }).then(()=>{
    models.events.findOne({ where: { eventid: req.query.id }}).then(event => {
      Promise.all(all_promise).then(()=>{
        res.render('events', {"event":event,"all_data":all_data,"all_schedules":all_schedules});
      });
    }).catch(err=>{
      console.log(err);
      res.redirect("/");
    });
  });
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

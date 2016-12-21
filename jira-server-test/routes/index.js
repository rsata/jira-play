var express = require('express');
var router = express.Router();
var request = require('request');

const fields = 'assignee,status,resolution,timetracking,labels,customfield_10903';

function jqlQuery(q) {
  return encodeURIComponent(q);
}

// router.post('/api/get', (req, res, next) => {
//   const query = req.body.query;
//   request.get('http://jira.rubicon.com/rest/api/2/search?jql='+jqlQuery(query)+'&maxResults=1000&fields='+fields, (err, response, body) => {
//     if (!err && response.statusCode == 200) {
//       res.send(body);
//     }
//   });
// });

router.post('/api/get', (req, res, next) => {
  const query = req.body.query;
  request.get('http://jira.rubicon.com/rest/api/2/search?jql='+jqlQuery(query)+'&maxResults=1000&fields='+fields, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      res.send(body);
    }
  });
});



module.exports = router;

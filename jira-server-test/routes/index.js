var express = require('express');
var router = express.Router();
var request = require('request');


const query = 'project = DEP AND resolution = unresolved AND assignee = rsata';
// const query = 'resolution = Done AND project = DEP AND createdDate > "2016/01/01"';
// const query = 'resolution = Done AND project = SS AND createdDate > "2016/01/01"';
// const query = 'resolution = Unresolved AND project = DEP';

const fields = 'assignee,status,resolution,timetracking';

function jqlQuery(query) {
  return encodeURIComponent(query);
}

router.get('/api/get', (req, res, next) => {
  jqlQuery();
  request.get('http://jira.rubicon.com/rest/api/2/search?jql='+jqlQuery(query)+'&maxResults=1000&fields='+fields, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      res.send(body);
    }
  });
});



module.exports = router;

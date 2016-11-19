var express = require('express');
var router = express.Router();
var request = require('request');

// var rest = require('./request');

/* GET home page. */
// router.get('/api', function(req, res, next) {
//   rest.getJSON(options, function(statusCode, result) {
//     // I could work with the result html/json here.  I could also just return it
//     // console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
//     res.statusCode = statusCode;
//     res.send(result);
//   });
// });
//
// var options = {
//     host: 'jira.rubicon.com',
//     port: 443,
//     path: '/rest/api/2/search?jql=resolution=unresolved&project=DEP&maxResults=20&asignee=rsata',
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// }

// const query = 'project = DEP AND resolution = unresolved AND assignee = rsata'
const query = 'resolution = Done AND project = DEP AND createdDate > "2016/01/01"'
// const query = 'resolution = Done AND project = SS AND createdDate > "2016/01/01"'
// const query = 'resolution = Unresolved AND project = DEP'

function jqlQuery(query) {
  return encodeURIComponent(query).toString();
}

router.get('/api/get', (req, res, next) => {
  jqlQuery();
  request.get('http://jira.rubicon.com/rest/api/2/search?jql='+jqlQuery(query)+'&maxResults=1000&fields=assignee,status,resolution,timetracking', (err, response, body) => {
    if (!err && response.statusCode == 200) {
      res.send(body)
    }
  })
})



module.exports = router;

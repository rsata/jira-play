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


router.get('/test', (req, res, next) => {
  request.get('http://jira.rubicon.com/rest/api/2/search?jql=resolution=unresolved&project=DEP&maxResults=20&asignee=rsata', (err, resp, body) => {
    res.send(body)
  })
})



module.exports = router;

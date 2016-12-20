var http = require("http");
var https = require("https");

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
exports.getJSON = function(options, onResult)
{
    console.log("rest::getJSON");

    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
};

exports.postJSON = function(options, onResult)
{
    console.log("rest::getJSON");

    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
};





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

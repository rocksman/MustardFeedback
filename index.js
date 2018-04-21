var express = require('express');
var mongo = require('mongodb').MongoClient;
var app = express();
var bodyParser = require('body-parser');

var url = "mongodb://localhost:27017/mydb";
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

mongo.connect(url, function(err,db){
    if(err)
        throw err;
    console.log("Connected to mongo server");
    var dbo = db.db("myDB");

    app.get('/', function (req, res) {
        res.sendFile(__dirname + "/" + "index.html");
    });
    
    app.post('/feedback', urlencodedParser, function (req, res) {
        response = {
            feedback: req.body
        };
        console.log(response.feedback);
        dbo.collection("feedbacks").insertOne(response.feedback, function(err, res) {
            if (err) 
                throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
          });
        res.end(JSON.stringify(response));
    });

    app.get('*', function (req, res) {
        res.send('what???', 404);
    });
});

var server = app.listen(4200, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})
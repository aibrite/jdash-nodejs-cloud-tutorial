var express = require('express');
var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Your application's authentication middleware
app.use(function (req, res, next) {
    req.user = "your-end-user"
    next();
})

app.get('/auth/jwt', function (req, res, next) {
    // Get end user from request based on your 
    // application's authentication mechanism
    var enduser = req.user;
    var jwt = require('jsonwebtoken');
    jwt.sign({
        data: {
            user: enduser /* current user of request */
        }
    }, 'TODO: REPLACE WITH SECRET', {
            algorithm: 'HS256',
            subject: 'TODO: REPLACE WITH APIKEY',
            expiresIn: "2h" /* optional but recommended */
        }, (err, token) => {
            if (err) {
                next(new Error(err))
            } else {
                res.send(token);
            }
        });
});

app.use(express.static(__dirname));

app.listen(3002, function () {

})
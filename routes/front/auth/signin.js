var express = require('express');
var router = express.Router();

var User = require('models/user').User;
var HttpError = require('error').HttpError;
var AuthError = require('models/user').AuthError;


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('front/signin');
});

router.post('/', function(req, res, next) {

    var username = req.body.username;
    var password = req.body.password;

    User.signin(username, password, function(err, user) {
        if (err) {
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }

        req.session.user = user._id;
        res.send({});

    });
});


var asd = [1, 2, 3, 4, 5];

module.exports = router;
var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var HttpError = require('error').HttpError;
var Product = require('models/product').Product;

router.get('/', function(req, res, next) {

    if(req.query.id === undefined){
        Product.find({}, function(err, products){
            if(err) return next(err);

            res.render('front/productlist', {
                products: products
            });
        });
    } else {
        try{
            var id = new ObjectID(req.query.id);
        } catch (e) {
            return next(new HttpError(404, "Bad request"));
        }
        Product.find({Category: id}, function(err, products){
            if(err) return next(err);

            res.render('front/productlist', {
                products: products
            });
        });
    }
});

module.exports = router;
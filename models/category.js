var async = require('async');
var util = require('util');

var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    categoryName: {
        type: String,
        unique: true,
        required: true
    },
    description : {
        type: String
        //required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.statics.getCategory = function(callback) {
    var Category = this;

    Category.find({}, function(err, categories){
        if(err) return callback(err);

        callback(null, categories);
    });

};

schema.statics.createCategory = function(categoryName, callback) {
    var Category = this;


};

schema.statics.updateCategory = function(categoryName, callback) {
    var Category = this;

};

schema.statics.deleteCategory = function(categoryName, callback) {
    var Category = this;

};

exports.Category = mongoose.model('Category', schema);

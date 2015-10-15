var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    productName: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    imagePath:{
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    Category:{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.statics.getProduct = function(callback) {
    var Product = this;

    Product.find({}, function(err, products){
        if(err) return callback(err);

        callback(null, products);
    });

};

schema.statics.createProduct = function(productName, callback) {
    var Product = this;


};

schema.statics.updateProduct = function(productName, callback) {
    var Product = this;

};

schema.statics.deleteProduct = function(productName, callback) {
    var Product = this;

};

exports.Product = mongoose.model('Product', schema);
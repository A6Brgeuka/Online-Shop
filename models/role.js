var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    role: {
        type: String,
        required: true,
        unique: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

exports.Role = mongoose.model('Role', schema);
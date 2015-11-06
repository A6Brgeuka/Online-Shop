var Category = require('models/category').Category;

module.exports = function(req, res, next) {
    req.category = res.locals.category= null;

Category.find({}, function(err, category) {
    if (err) return next(err);

    req.category = res.locals.category = category;
    next();
});
};
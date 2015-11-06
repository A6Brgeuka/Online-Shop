var mongoose = require('libs/mongoose');
var async = require('async');
var log = require('libs/log')(module);

var cat = [];
var roles1 = [];

async.series([
    open,
    dropDatabase,
    requireModels,
    createRoles,
    createUsers,
    createCategories,
    createProducts
], function(err) {
    //console.log(arguments);
    log.info("ok");
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('models/role');
    require('models/user');
    require('models/product');
    require('models/category');

    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}


function createRoles(callback) {

    console.log("create Roles");

    var roles = [
        {role: 'admin'},
        {role: 'user'}
    ];

    async.each(roles, function(roleData, callback) {
        var role = new mongoose.models.Role(roleData);
        roles1.push(role);
        role.save(callback);
    }, callback);
}

function createUsers(callback) {

    console.log("create Users");

    var users = [
        {username: 'admin', password: 'admin', roleId: roles1[0]._id},
        {username: 'user1', password: 'user1', roleId: roles1[1]._id},
        {username: 'user2', password: 'user2', roleId: roles1[1]._id}
    ];

    async.each(users, function(userData, callback) {
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
}


function createCategories(callback) {
    console.log("create Categories");

    var categories = [
        {categoryName: 'Категория1', description: 'description1'},
        {categoryName: 'Категория2', description: 'description2'},
        {categoryName: 'Котегория3', description: 'description3'},
        {categoryName: 'Категория', description: 'description3'}
    ];

    async.each(categories, function(categoryData, callback) {
        var category = new mongoose.models.Category(categoryData);
        cat.push(category);
        category.save(callback);
    }, callback);
}

function createProducts(callback) {
    console.log("create Products");

    var products = [
        {productName: 'productName1', description: 'description1', imagePath: 'boatbig.png', price: 10, categoryId: cat[0]._id},
        {productName: 'productName2', description: 'description2', imagePath: 'boatsail.png', price: 15, categoryId: cat[0]._id},
        {productName: 'productName3', description: 'description3', imagePath: 'carracer.png', price: 20, categoryId: cat[0]._id},
        {productName: 'productName4', description: 'description4', imagePath: 'busgreen.png', price: 25, categoryId: cat[1]._id},
        {productName: 'productName5', description: 'description5', imagePath: 'rocket.png', price: 30, categoryId: cat[1]._id},
        {productName: 'productName6', description: 'description6', imagePath: 'boatbig.png', price: 35, categoryId: cat[1]._id},
        {productName: 'productName7', description: 'description7', imagePath: 'planeglider.png', price: 40, categoryId: cat[2]._id},
        {productName: 'productName8', description: 'description8', imagePath: 'planeprop.png', price: 45, categoryId: cat[2]._id},
        {productName: 'productName9', description: 'description9', imagePath: 'carfast.png', price: 50, categoryId: cat[2]._id},
        {productName: 'productName10', description: 'description10', imagePath: 'carearly.png', price: 55, categoryId: cat[2]._id}
    ];

    async.each(products, function(productData, callback) {
        var product = new mongoose.models.Product(productData);
        product.save(callback);
    }, callback);
}



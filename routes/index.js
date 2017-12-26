var express = require('express');
var router = express.Router();
var csv      = require('csv-express');
var mongoose = require('mongoose');
var Product  = mongoose.model('Products');

/* GET home page. */
 router.get('/', function(req, res, next) {
    Product.find({}, function(err, products) {
        if (err)
          res.send(err);
        console.log(products);   
        res.render('index', { title: 'Nodejs MongoDB export to CSV', products: products });
    });
 });
router.post('/addproduct',(req,res,next)=>{
	product = {
		product_name:req.body.product_name,
        price: req.body.price,
        category: req.body.category
    }
	Product.create(product,(error,success)=>{
		if(error){
		   res.send("error while adding record");
		}
		res.send("record added");;
	});
});
 router.get('/exporttocsv', function(req, res, next) {
    var filename   = "products.csv";
    var dataArray;
    Product.find().lean().exec({}, function(err, products) {
        if (err) res.send(err);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(products, true);
    });
 });



module.exports = router;

var express = require('express');
var router = express.Router();

//db references 
var mongoose = require('mongoose');
var Business = require('../models/business.js');

// GET - show main business page
router.get('/', function (req, res, next) {

    // use the business model to query the business collection 
    Business.find(function (err, businesses) {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('businesses/index', {
                title: 'Business Contact List',
                businesses:businesses
            });
        }
       

    })
  
});
// GET add page - show the blank form
router.get('/add', function(req, res, next) {
    res.render('businesses/add', {
        title: 'Add a New Business Contact List'
    });
});

// POST add page - save the new business contact member.
router.post('/add', function(req, res, next) {

    Business.create( {
         ContactName:req.body.ContactName,
         ContactNumber:req.body.ContactNumber,
         EmailAddress: req.body.EmailAddress
    }, function(err, Business) {
        // did we get back an error or valid Business contact List object??
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businesses');
        }
    });
});


// GET edit page - show the current business contact information in the form
router.get('/:id', function(req, res, next) {

    var id = req.params.id;

    Business.findById(id, function(err, Business) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('businesses/edit', {
                title: 'Business Contact List Information Details',
                businesses:Business
            });
        }
    });
});

// POST edit page - update the selected Business Contact List
router.post('/:id', function(req, res, next) {

    // grab the id from the url parameter
    var id = req.params.id;

    // create and populate an  business contact object
    var Businesses = new Business( {
        _id: id,
         ContactName:req.body.ContactName,
         ContactNumber:req.body.ContactNumber,
         EmailAddress: req.body.EmailAddress
    });

    // run the update using mongoose and our model
    Business.update( { _id: id },Businesses, function(err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businesses');
        }
    });
});
//
// GET delete business contact list
router.get('/delete/:id', function(req, res, next) {

    // get the id from the url
    var id = req.params.id;

    // use the model and delete this record
    Business.remove( { _id: id }, function(err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businesses');
        }
    });
});

// make this public
module.exports = router;

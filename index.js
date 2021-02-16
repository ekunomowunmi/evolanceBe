var http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


http.createServer(function (req, res) {  
    res.writeHead(200, {'Content-Type': 'text/html'});  
    res.end('Hello World!');}).listen(8080); 


    var mongoClient = require('mongodb').MongoClient;
    
    var url = "mongodb://127.0.0.1:27017/Evolance";
    // mongoClient.connect(url, {useNewUrlParser},function(err, db) {  
    //     if (err) throw err; 
    //      console.log("Database created!");
    //        db.close();
    //     }); 
    mongoose.connect(url, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify:false}, (err,db) => {
        if(err) {throw err;}
        console.log("Database Created yo");
        // db.close();
    });

    const sellerRoute = require('./routes/user.route');

    app.use('/api',sellerRoute);

    app.listen(3003, () => console.log('Server running'))


console.log('May Node be with you')
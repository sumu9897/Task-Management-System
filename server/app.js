//Basic Lib Import
const express = require('express');
const router =require('./src/routes/api');

const app = new express();
const bodyParser = require('body-parser');

//Security Middleware Lib Import
const rateLimit = require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean')
const hpp = require('hpp');
const cors = require ('cors');
// const cookieParser = require('cookie-parser');

// const path = require('path');

//Database Lib Import
const mongoose=require('mongoose');


//Security Middleware Implement
// app.use(cookieParser());
app.use(cors())
app.use(mongoSanitize)
app.use(xss())
app.use(helmet())
app.use(hpp())

//Body Parser Implement
app.use(bodyParser.json())

const limiter = rateLimit({windowMs: 15*60*1000, max: 3000});
app.use(limiter)


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

let URI = "mongodb+srv://taskms:lXEfk0vIauUaVihz@cluster0.rmec6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let OPTION = { autoIndex: true };

mongoose.connect(URI, OPTION)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });




// app.set('etag',false);

//Routing Implement
app.use("/api/v1",router)
// app.use(express.static('client/dist'));

//Undefined Route Implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
})

//Add React Front End Routing
// app.get('*',function (req, res) {
//     res.sendFile(path.resolve( __dirname,'client','dist','index.html'))
// })
module.exports = app;

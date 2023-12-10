const express = require("express");
const router =require("./src/routes/api.js")
const app = express();
//if body parser needed
// const bodyParser = require("body-parser");
// const path= require('path');


//Security Middleware
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");


const mongoSanitize = require("express-mongo-sanitize");
// const xss=required("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const xss= require("xss-clean"); 

//Database lib import
const mongoose = require("mongoose");
const { clean } = require("xss-clean/lib/xss.js");
const path=require('path');



// Mongo DB Database Connection //mongodb+srv://afrinasha217:<password>@cluster0.vwtd1ur.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://afrinasha217:afrin123@cluster0.vwtd1ur.mongodb.net/Ecommerce?retryWrites=true&w=majority
let URI="mongodb+srv://<username>:<password>@cluster0.vwtd1ur.mongodb.net/Ecommerce?retryWrites=true&w=majority";
let OPTION={user:'afrinasha217',pass:'afrin123',autoIndex:true}
mongoose.connect(URI,OPTION).then((res)=>{
    console.log("Database Connected Successfully");
}).catch((err)=>{   
    console.log(err);
})

//security middleware Implement
app.use(cookieParser());
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
// app.use(xss())
app.use(hpp())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));// shows error body-parser deprecated undefined extended: provide extended option 


const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)



//Body parser
// app.use(bodyParser.json());

//tagging


app.use("/api/v1",router);

app.use(express.static('client-side/dist'));

app.get('*',function (req,res) {
    res.sendFile(path.resolve(__dirname,'client-side','build','index.html'))
})

module.exports =app;
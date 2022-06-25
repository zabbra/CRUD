const express = require('express')
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const path = require('path')
const connectDB = require('./server/database/connection')


const app = express();
dotenv.config({path:'./config.env'})

const Router = require('./server/routes/router')
 

//log requests
app.use(morgan('tiny'));
 
//mongodb connection
connectDB();
//parse requests to body-parser
app.use(bodyParser.urlencoded({extended:true}))


//set view engine  moteur de template a utiliser
app.set("view engine","ejs")
//app.set('views',path.resolve(__dirname,"views/ejs"))


//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname,"assets/img")));
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))


//load routers
app.use('/', Router)

const PORT = process.env.PORT || 5000
app.listen(PORT,function(){
  console.log('Server is running on http://locahost:' + PORT);
});


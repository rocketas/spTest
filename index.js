import { hasBrowserCrypto } from 'google-auth-library/build/src/crypto/crypto';

const express  = require('express'),
      {Client} = require("pg"),
         app   = express(),
         bcrypt       = require('bcrypt'),
         env   = require('dotenv');
         env.config();

const path          = require('path'),
      generalRoutes = require("./routes/general-routes"), 
      authRoutes    = require("./routes/auth-routes"),
      queryString   = require('query-string'),
      passportGoole = require("./config/google"),
      passport      = require('passport'),
      expressSession = require('express-session'),
      cors          = require('cors'),
      bodyParser     = require('body-parser')



let whiteListOrigins = [
  'http://localhost:5000/login',
  'http://localhost:5000',
  'http://localhost:3000',
  'http://localhost:3000/auth/google/login',
  'http://localhost:3000/auth/google',
  'http://localhost:3000/auth/google/logintest',
  'http://localhost:5000/auth/login',
  'http://localhost:5000/auth/signup',
  'http://localhost:5000/auth/logout',
  'http://localhost:5000/auth/login',
  'http://localhost:5000/users',
  'http://localhost:5000/users:id'
]


let corsOptions = {
  origin: function(origin, callback){
    console.log(origin);
    if(!origin || whiteListOrigins.indexOf(origin) !== -1){
      callback(null,true)
    }else{
      console.log(origin)
      callback(new Error("cors error in setup"))
    }
  }
}

app.use(expressSession({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  httpOnly: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//app.use(express.json())

let loginCheck = (req, res, next) => {
  // console.log("printing req.session")
  // console.log(req.session)
  // if(req.session.user){
  //   console.log("user is logged in")
  // }else{
  //   console.log("user is not logged in")
  // }
  next()
}

app.use(loginCheck)

app.use(passport.initialize());
app.use(passport.session());
// Using env to hide credentials, used to access postgreSQL
let info = {
    account : process.env.ACCOUNT_NAME,
    password : process.env.PASSWORD,
    host: process.env.HOST,
    port : process.env.DBPORT,
    database : process.env.DATABASE,
    str  : function () {
        let x = `postgres://${this.account}:${this.password}`
          + `@${this.host}:${this.port}`
          + `/${this.database}`;

        console.log(x)
        return x
      }
};

export const postgreSQLclient = new Client({connectionString: info.str(), ssl:true})

postgreSQLclient
.connect()
.then(() => console.log('connected to PostgreSQL'))
.catch(err => console.error('connection error to PostgreSQL', err.stack))

app.use("/", generalRoutes);
app.use("/auth", authRoutes);
app.use(express.static('client/build'));

app.use(function handlePostgresError(error, req, res, next){
  console.log("in error handling middlware")
  console.log(error)
})

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Control-Type, Accept");
  next();
});


app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
}); 


module.exports = {
  app
}
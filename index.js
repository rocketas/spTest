const express  = require('express'),
      {Client} = require("pg"),
         app   = express(),
         env   = require('dotenv');
         env.config()

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
  'http://localhost:5000/auth/login'
]


let corsOptions = {
  origin: function(origin, callback){
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

//GET, POST, PUT, DELETE functions for postgres data
const getUsers = (req, res) => {
  postgreSQLclient.query('SELECT * FROM admin ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const getUserById = (req, res) => {
  const id = parseInt(req.params.id)

  postgreSQLclient.query('SELECT * FROM admin WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const createUser = (req, res) => {
  const {
    firstname, lastname, email, phone, title, googleId, address, city, statename, zipcode, description
  } = req.body

  postgreSQLclient.query('INSERT INTO admin (firstname, lastname, email, phone, title, googleId, address, city, statename, zipcode, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
  [firstname, lastname, email, phone, title, googleId, address, city, statename, zipcode, description], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateUser = (req, res) => {
  const id = parseInt(req.params.id)
  const {
    firstname, lastname, email, phone, title, googleId, address, city, statename, zipcode, description
  } = req.body

  postgreSQLclient.query(
    'UPDATE admin SET firstname = $1, lastname = $2, email = $3, phone = $4, title = $5, googleId = $6, address = $7, city = $8, statename = $9, zipcode = $10, description = $11 WHERE id = $12',
    [firstname, lastname, email, phone, title, googleId, address, city, statename, zipcode, description, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id)

  postgreSQLclient.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User deleted with ID: ${id}`)
  })
}

app.use("/", generalRoutes);
app.use("/auth", authRoutes);
app.get('/users', getUsers)
app.get('/users/:id', getUserById)
app.post('/users', createUser)
app.put('/users/:id', updateUser)
app.delete('/users/:id', deleteUser)

app.use(express.static('client/build'));

app.use(function handlePostgresError(error, req, res, next){
  console.log("in error handling middlware")
  console.log(error)
})

app.use(function authorizationError(error, req, res, next){

})


app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
}); 


module.exports = {
  app,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
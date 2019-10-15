var express  = require('express'),
    {Client} = require("pg"),
         app = express();
         env = require('dotenv'),
         env.config()




// Using env to hide credentials, used to access postgreSQL
let info = {
    account : process.env.ACCOUNT_NAME,
    password : process.env.PASSWORD,
    host: process.env.HOST,
    port : process.env.DBPORT,
    database : process.env.DATABASE,
    str  : function () {
        return `postgres://${this.account}:${this.password}`
          + `@${this.host}:${this.port}`
          + `/${this.database}`;
      }
};


const client = new Client(info.str())

client
.connect()
.then(() => console.log('connected to PostgreSQL'))
.catch(err => console.error('connection error to PostgreSQL', err.stack))
 


app.get("/", function(req,res){
    res.send("<a href='client'> Client Log In </> <a href='admin'> Admin Log In </>")
})

app.get("/admin", function(req,res){
    client.query("SELECT * FROM Admin where name = 'Robert' ", (error, response) =>{
        if(error){
            console.log("ERROR: SELECT for Admin where name = 'Robert' ", error)
        }else{
            name = response.rows[0].name
            age = response.rows[0].age
            // res.send(" <p> Admin's name: "+ name+ "</p>"+" <p> Admin's age: "+ age+ "</p>")
            res.send({name: response.rows[0].name});
        }
    })
});

app.get("/client", function(req,res){

    client.query(" SELECT * FROM users WHERE users.name = 'Elise'  ", (error,response)=>{
        if(error) {
            console.log("error in SELECT * FROM users")
        }else{
            pid = response.rows[0].pid
            name = response.rows[0].name
            
            res.send(" <p> Clients's name: "+ name+ "</p>"+" <p> Clients's pid: "+ pid+ "</p>")        }
    })
})


app.listen(5000, function(){
    console.log("connected to localhost:5000")
})

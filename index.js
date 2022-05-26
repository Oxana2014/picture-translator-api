if(process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const image = require('./controllers/image')
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const bcrypt = require('bcrypt');
const knex = require('knex');
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : process.env.POSTGRES_PASSWORD,
      database : 'smart-cook'
    }
  });

//   db.select('*').from('users').then(data => {
//       console.log(data);
//   }); 

const app = express();


app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json("home")
})

app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt) )

app.get('/profile/:id', (req, res) => profile.getUserProfile(req, res, db))

app.put('/image', (req, res) => image.handleEntries(req, res, db))

app.post("/imageurl",  image.handleApiCall)

app.listen(3000, () => {
    console.log( "App is running on port 3000")
})

/*
/
/signin POST = success/fail
/register POST = user
/profile/:userId GET = user
/image PUT = updated user
*/
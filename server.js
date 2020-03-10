const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'Schule123',
      database : 'smartbrain'
    }
  });

db.select('*').from('users').then(data =>{
    console.log(data);
});

const app = express();
app.use(bodyParser.json());
app.use(cors())



app.get('/', (req, res) => {res.send(database.users)})
app.post('/signin', (req, res) => {signIn.handleSignin(req, res, bcrypt, db)})
app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, db)})
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})
app.put('/image', (req, res) =>{image.handleImage(req, res, db)})
app.listen(process.env.PORT || 3001, () => {
    console.log(`app is running ${process.env.PORT}`);
})
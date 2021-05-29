const express =require('express');
const mongoose =require('mongoose');
const bodyParser=require('body-parser')
const passport=require('passport');
const bcrypt=require('bcryptjs');
const cors=require('cors');



const app = express();

app.use(cors())


const usersvar=require('./routes/api/users');
const productVar=require('./routes/api/products');



const user = require("./models/User");

// Database url
const db=require('./config/keys').mongoURI
const port = process.env.PORT || 5000;
// body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// passport middleware
app.use(passport.initialize());
require('./config/passport')(passport)



// Connect to Mongodb
mongoose
.connect(db)
.then(()=>
console.log("Db connected"))
// INSERT INTO bootstrap
const  encryptPassword = async (pwd)=>{
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(pwd, salt);
	return hash
} 

bootStrap()
// Routes
app.use('/api/users',usersvar);
app.use('/api/products',productVar);


app.listen(port,()=>console.log(`server is running at ${port}`));
app.get('/',(req,res) => res.send("hi.."));

// Adding comment for testing git
// Super users to be inserted here.

async function bootStrap(){
const conn = mongoose.connection;
const userList = [{ name: 'admin', email: "admin@test.com", password: await encryptPassword("admin@1234"), date: new Date() }, 
{ name: 'admin1', email: "admin1@test.com", password: await encryptPassword("admin@1234"), date: new Date()}, { name: 'admin2', email: "admin2@test.com", password: await encryptPassword("admin@1234"), date: new Date() }]

const collection = conn.collection("users").insertMany(userList, function(err, res) {
     if(err)
	console.log("Record already Exist");
	 else
    console.log("Record inserted", res);
  });

}
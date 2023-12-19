const express=require("express");
const cors=require("cors");
const dotenv =require("dotenv").config()
const mongoose=require("mongoose");
const {connection} = require("./db")
const authControllers=require("./controllers/authController");
const productController = require('./controllers/productController')
const uploadController = require('./controllers/uploadController')

const app=express();
//connect to db 
mongoose.set('strictQuery',false)
//routes & middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/images', express.static('public/images'))
app.use('/auth', authControllers)
app.use('/product', productController)
app.use('/upload', uploadController)


app.get('/', (req, res) => {
    res.send('Welcome To EatO FOOD APP');
  });
//start server 
const PORT = process.env.PORT || 4000;

app.listen(PORT,async()=> {
  try {
      await connection
      console.log("Database connection Established")
      console.log(`Server is running at http://localhost:${PORT}`);
  }
  catch {
      console.log("Database connection Failed")
  }
  console.log("Server Started")
  })


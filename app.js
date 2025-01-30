require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')

const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const userRouter = require('./controllers/users')
//const taskRouter = require('./controllers/tarea')

//conexion a BD

    
    //(async()=>{
    try{
        //await 
        mongoose.connect(process.env.MONGO_URI)
        console.log('Conexion a BD correcta')
    } catch(error){
        console.log(error)
    }
   //})()
    



//crear rutas de front end
app.use('/', express.static(path.resolve('views','home')))
app.use('/components', express.static(path.resolve('views','components')))
app.use('/pagos', express.static(path.resolve('views','pagos')))
app.use('/geo', express.static(path.resolve('views','geo')))
app.use('/login', express.static(path.resolve('views','login')))
app.use('/admin', express.static(path.resolve('views','admin')))
app.use('/registro', express.static(path.resolve('views','registro')))
app.use('/images',express.static(path.resolve('img')))

//ojo super super importante el app.use
app.use(express.json());

//rutas de backend
app.use('/api/users',userRouter);

module.exports = app;
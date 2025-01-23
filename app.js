require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const userRouter = require('./controllers/usuario')
//const taskRouter = require('./controllers/tarea')

//conexion a BD

    
    (async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Conexion a BD correcta')
    } catch(error){
        console.log(error)
    }
    })()
    



//crear rutas de front end

app.use('/', express.static(path.resolve('views','home')))
app.use('/components', express.static(path.resolve('views','components')))
app.use('/pagos', express.static(path.resolve('views','pagos')))
app.use('/geo', express.static(path.resolve('views','geo')))
app.use('/login', express.static(path.resolve('views','login')))
app.use('/registro', express.static(path.resolve('views','registro')))

module.exports = app;
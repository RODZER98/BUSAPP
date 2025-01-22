require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
//const userRouter = require('./controllers/usuario')
//const taskRouter = require('./controllers/tarea')

//conexion a BD

    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log('Conexion a BD correcta')
    } catch(error) {
        console.log(error)
    }



//crear rutas de front end

app.use('/', express.static(path.resolve('views','home')))
app.use('/', express.static(path.resolve('views','pagos')))
app.use('/', express.static(path.resolve('views','geo')))
app.use('/', express.static(path.resolve('views','login')))
app.use('/', express.static(path.resolve('views','registro')))

module.exports = app
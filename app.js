//require('dotenv').config()
const express = require('express')
const app = express()
//const mongoose = require('mongoose')
const path = require('path')

//conexion a BD

    /*try{
        mongoose.connect(process.env.MONGO_URL)
        console.log('Conexion a BD correcta')
    } catch(error) {
        console.log(error)
    }*/



//crear rutas de front end

app.use('/', express.static(path.resolve('views','home')))
module.exports = app
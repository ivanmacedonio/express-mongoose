const mongoose = require('mongoose')

const dbconnect = () => {
    mongoose.set('strictQuery', true)
    mongoose.connect('mongodb://localhost:27017/db_testing')
        .then(() => {
            console.log('Conexion existosa')
        })
        .catch((err) => {
            console.log(err.toString())
        })
}

module.exports = dbconnect
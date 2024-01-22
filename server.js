const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dbUri = 'mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}.y4jhlbf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority'

//routes
app.get('/', (req, res) => {
    res.send('Hello world and other planets')
})



mongoose.connect(dbUri)
.then(() => {
    app.listen(3000, ()=> {
        console.log('Node API app is running on port 3000')
    })
    console.log('connected to mongo-db');
}).catch((error) => {
    console.log(error);
})
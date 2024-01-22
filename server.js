require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const Item = require('./models/itemModel')
const app = express();
const dbUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send('Hello world and other planets')
})

app.post('/item', async(req, res) => {
    try {
        const item = await Item.create(req.body);
        res.status(200).json(item);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
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
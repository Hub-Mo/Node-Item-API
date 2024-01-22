require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const Item = require('./models/itemModel')
const app = express();
const dbUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.get('/', (req, res) => {
    res.send('Hello world and other planets')
})

// get all

app.get('/items', async(req, res) => {
    try {
        const items = await Item.find({});
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//CREATE

app.post('/items', async(req, res) => {
    try {
        const item = await Item.create(req.body);
        res.status(200).json(item);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})


// READ

app.get('/item/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const item = await Item.findById(id);
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// UPDATE

app.put('/item/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const item = await Item.findByIdAndUpdate(id, req.body);
        if(!item){
            return res.status(404).json({message:  `cannot find a product with ID: ${id}`});
        }
        const updatedItem = await Item.findById(id);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// DELETE

app.delete('/item/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const item = await Item.findByIdAndDelete(id);
        if(!item){
            return res.status(404).json({message:  `cannot find a product with ID: ${id}`});
        }
        return res.status(200).json({item});
    } catch (error) {
        res.status(500).json({message: error.message})
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
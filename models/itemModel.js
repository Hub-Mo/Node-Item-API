const mongoose = require('mongoose')

const itemSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter the item name"],
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        color: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Item = mongoose.model('Item', itemSchema);

module.expeorts = Item;
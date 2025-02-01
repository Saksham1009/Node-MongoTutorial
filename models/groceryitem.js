const mongoose = require('mongoose');

const groceryitemSchema = new mongoose.Schema({
    grocery_item_name: {
        type: String,
        required: true
    },
    grocery_item_price: {
        type: Number, 
        required: true
    }

}); 

module.exports = mongoose.model('groceryitem', groceryitemSchema);
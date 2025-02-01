const express = require('express');
const router = express.Router();
const GroceryItem = require('../models/groceryitem');

// Get the entire grocery list 
router.get('/', async (req, res) => {
    try {
        const grocerylist = await GroceryItem.find();
        res.json(grocerylist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const grocery_item = new GroceryItem({
        grocery_item_name: req.body.grocery_item_name,
        grocery_item_price: req.body.grocery_item_price
    });

    try {
        const newgroceryItem = await grocery_item.save();
        res.status(201).json(newgroceryItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
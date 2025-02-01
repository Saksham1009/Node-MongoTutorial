const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

// Get all subscribers
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get specific subscriber
router.get('/:id', async (req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id);
        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }
        res.json(subscriber);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a subscriber
router.post('/', async (req, res) => {
    const subsriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    });

    try {
        const newSubscriber = await subsriber.save();
        res.status(201).json(newSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a subscriber
router.patch('/:id', async (req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id);
        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }
        if (req.body.name) {
            subscriber.name = req.body.name;
        }
        if (req.body.subscribedToChannel) {
            subscriber.subscribedToChannel = req.body.subscribedToChannel;
        }
        const updatedSubscriber = await subscriber.save();
        res.json(updatedSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const subscriber = await
        Subscriber.findById(req.params.id);
        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }
        await subscriber.remove();
        res.json({ message: 'Subscriber deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
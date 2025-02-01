const express = require('express');
const router = express.Router();
const Player = require('../models/player');

// Get all players
router.get('/', async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get specific player
router.get('/:id', async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.json(player);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Find a player by name
router.get('/name/:name', async (req, res) => {
    try {
        const player = await Player.find({ name: req.params.name });
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.json(player);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a player
router.post('/', async (req, res) => {
    const player = new Player({
        name: req.body.name,
        position: req.body.position,
        number: req.body.number,
        team: req.body.team
    });

    try {
        const newPlayer = await player.save();
        res.status(201).json(newPlayer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a player
router.patch('/:id', async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        if (req.body.name) {
            player.name = req.body.name;
        }
        if (req.body.position) {
            player.position = req.body.position;
        }
        if (req.body.number) {
            player.number = req.body.number;
        }
        if (req.body.team) {
            player.team = req.body.team;
        }
        const updatedPlayer = await player.save();
        res.json(updatedPlayer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a player
router.delete('/:id', async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        await player.remove();
        res.json({ message: 'Player deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
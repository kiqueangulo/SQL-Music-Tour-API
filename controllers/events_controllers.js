const events = require('express').Router();
const { Event } = require('../models/event.js');
const { Op } = require('sequelize');

events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            where: {
                name: { [Op.like]: `${req.query.name ?? ''}` }
            },
            order: [ [ 'date', 'ASC' ] ]
        });

        res.status(200).json(foundEvents);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body);

        res.status(201).json({
            message: 'Successfuly created',
            data: newEvent
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

events.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { event_id: req.params.id }
        });

        res.status(200).json(foundEvent);
    } catch (err) {
        res.status(500).json(err);
    }
});

events.put('/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.update(req.body, {
            where: { event_id: req.params.id },
            returning: true
        });

        res.status(200).json(updatedEvent);
    } catch (err) {
        res.status(500).json(err);
    }
});

events.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.destroy({
            where: { event_id: req.params.id }
        });

        res.status(204).json({
            message: `${deletedEvent} event(s) successfully deleted.`
        });
    } catch (err) {
        res.status(404).json(err);
    }
});

module.exports = events;
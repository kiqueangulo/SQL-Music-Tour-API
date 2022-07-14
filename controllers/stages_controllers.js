const stages = require('express').Router();
const { Stage } = require('../models/stage.js');
const { Op } = require('sequelize');

stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll({
            where: {
                name: { [Op.like]: `${req.query.name ?? ''}` }
            }
        });

        res.status(200).json(foundStages);
    } catch (err) {
        res.status(500).json(err);
    }
});

stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body);

        res.status(201).json({
            message: 'Successfuly created',
            data: newStage
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

stages.get('/:id', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { stage_id: req.params.id }
        });

        res.status(200).json(foundStage);
    } catch (err) {
        res.status(500).json(err);
    }
});

stages.put('/:id', async (req, res) => {
    try {
        const updatedStage = await Stage.update(req.body, {
            where: { stage_id: req.params.id },
            returning: true
        });

        res.status(200).json(updatedStage);
    } catch (err) {
        res.status(500).json(err);
    }
});

stages.delete('/:id', async (req, res) => {
    try {
        const deletedStage = await Stage.destroy({
            where: { stage_id: req.params.id }
        });

        res.status(204).json({
            message: `${deletedStage} event(s) successfully deleted.`
        });
    } catch (err) {
        res.status(404).json(err);
    }
});

module.exports = stages;
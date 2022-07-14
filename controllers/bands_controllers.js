const bands = require('express').Router();
const { Band } = require('../models');
const { Op } = require('sequelize');

bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ?? ''}%` }
            }
        });
        res.status(200).json(foundBands);
    } catch (err) {
        res.status(500).json(err);
    }
});

bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body);

        res.status(200).json({
            message: 'Successfully created',
            data: newBand
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

bands.get('/:id', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { band_id: req.params.id }
        });

        res.status(200).json(foundBand);
    } catch (err) {
        res.status(500).json(err);
    }
});

bands.put('/:id', async (req, res) => {
    try {
        const updatedBand = await Band.update(
            req.body,
            {
                where: 
                    { band_id: req.params.id },
                    returning:true
            }
        );

        res.status(200).json(updatedBand);
    } catch (err) {
        res.status(500).json(err);
    }
});

bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: { band_id: req.params.id }
        });

        res.status(200).json({
            message: `${deletedBands} band(s) successfuly updated`
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = bands;
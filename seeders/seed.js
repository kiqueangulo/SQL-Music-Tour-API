const db = require('../models/index.js');

db.sequelize.sync({force: true}).then(async function() {


    await db.Band.create({
        name: 'test_band_1',
        genre: 'super cool',
    });

    await db.Event.create({
        name: 'Lollapalooza'

    });

    await db.Meet_Greet.create({
        event_id: 1,
        band_id: 1
    });
    
    await db.Stage.create({
        name: 'Main Stage'
    });

    await db.Stage_Events.create({
        stage_id: 1,
        event_id: 1
    });
    
    await db.Set_Time.create({
        event_id: 1,
        stage_id: 1,
        band_id: 1
    });

});
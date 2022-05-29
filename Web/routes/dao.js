const express = require('express');
const router = express.Router();
const dao = require('../services/dao');
router.get('/', async function(req, res, next) {
    try {
        res.json(await dao.readRadioShowManagers(req.query.page));
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});

module.exports = router;
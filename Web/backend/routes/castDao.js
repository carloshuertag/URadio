const express = require('express');
const router = express.Router();
const castDao = require('../services/radioShowCastSongDao');
router.get('/', async function(req, res, next) {
    try {
        res.json(await castDao.readRadioShowCastSong(req.query.page, req.params));
    } catch (err) {
        console.error(`Error while getting radio show managers `, err.message);
        next(err);
    }
});
router.put('/:isrc/:managerId', async function(req, res, next) {
    try {
        res.json(await castDao.createRadioShowCastSong(req.params.isrc, req.params.managerId));
    } catch (err) {
        console.error(`Error while updating radio show manager`, err.message);
        next(err);
    }
});

module.exports = router;
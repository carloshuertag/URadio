const express = require('express');
const router = express.Router();
const radioShowDao = require('../services/radioShowDao');
router.get('/', async function(req, res, next) {
    try {
        res.json(await radioShowDao.readRadioShows(req.query.page));
    } catch (err) {
        console.error(`Error while getting radio show managers `, err.message);
        next(err);
    }
});
/*router.post('/', async function(req, res, next) {
    try {
        res.json(await dao.createRadioShowManager(req.body));
    } catch (err) {
        console.error(`Error while creating radio show manager`, err.message);
        next(err);
    }
});
router.put('/:mail', async function(req, res, next) {
    try {
        res.json(await dao.updateRadioShowManager(req.params.mail, req.body));
    } catch (err) {
        console.error(`Error while updating radio show manager`, err.message);
        next(err);
    }
});
router.delete('/:mail', async function(req, res, next) {
    try {
        res.json(await dao.deleteRadioShowManager(req.params.mail));
    } catch (err) {
        console.error(`Error while deleting radio show manager`, err.message);
        next(err);
    }
});*/


module.exports = router;
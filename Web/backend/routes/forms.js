const express = require('express');
const crypto = require("crypto");
const radioShowManagerDao = require("../services/radioShowManagerDao");
const router = express.Router();
const mailRegex = '([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}';
const pswdRegex = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';

router.post('/signin', async(request, response) => {
    let data = { managerId: 0, message: '' };
    response.contentType("application/json");
    if (request.body.mail == "" || request.body.pswd == "")
        response.status(400);
    else {
        request.body.pswd = crypto.createHash("sha256").update(request.body.pswd).digest("hex");
        signin = await radioShowManagerDao.signInRadioShowManager(1, request.body);
        if (signin.data.message == 'Success') {
            request.session.regenerate(function(err) {
                if (err) next(err)
                request.session.managerId = signin.data.result[0].managerId;
                request.session.save(function(err) {
                    if (err) return next(err)
                })
            });
            data = { managerId: signin.data.result[0].managerId, message: 'Success' };
        } else if (signin.data.message == 'pswd') {
            data = { managerId: signin.data.result[0].managerId, message: 'pswd' };
        } else {
            data = { managerId: 0, message: 'mail' };
        }
        response.status(200);
    }
    response.send(data);
    response.end();
});
router.post('/signup', async(request, response) => {
    let data = { status: '', message: '', managerId: 0 };
    response.contentType("application/json");
    if (request.body.mail == "" || request.body.pswd == "")
        response.status(400);
    else {
        request.body.pswd = crypto.createHash("sha256").update(request.body.pswd).digest("hex");
        create = await radioShowManagerDao.createRadioShowManager(request.body);
        data.status = create.data.status;
        data.message = create.data.message;
        manager = await radioShowManagerDao.signInRadioShowManager(1, request.body);
        data.managerId = manager.data.result[0].managerId;
        request.session.regenerate(function(err) {
            if (err) next(err)
            request.session.managerId = data.managerId;
            request.session.save(function(err) {
                if (err) return next(err)
            })
        })
        response.status(200);
    }
    response.send(data);
    response.end();
});

module.exports = router;
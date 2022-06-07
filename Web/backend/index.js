require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const port = process.env.port;
const daoRouter = require("./routes/radioShowDao");
const radioShowManagerDao = require("./services/radioShowManagerDao");
const castRouter = require("./routes/castDao");
const crypto = require("crypto");
const helmet = require("helmet");
app.use(
    session({
        secret: "uradiosessionasies",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true, maxAge: 300000 },
    })
); // express-session settings
app.use(express.json()); // for parsing application/json
app.use(
    express.urlencoded({
        extended: true,
    })
); // to support URL-encoded bodies
app.use(helmet()); // Helmet secures Express from some well-known web vulnerabilities by setting HTTP headers
app.use(express.static('../frontend/')); // to serve static files
const mailRegex = '/([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm';
const pswdRegex = '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm';
app.post('/signin', async(req, res) => {
    let data;
    response.contentType("application/json");
    if (!request.body.mail.match(mailRegex) || !request.body.pswd.match(pswdRegex))
        response.status(400);
    else {
        request.body.pswd = crypto.createHash("sha256").update(request.body.pswd).digest("hex");
        signin = await radioShowManagerDao.signInRadioShowManager(request.body);
        if (signin.data.message == 'Success') {
            req.session.regenerate(function(err) {
                if (err) next(err)
                req.session.managerId = signin.data.result.managerId;
                req.session.save(function(err) {
                    if (err) return next(err)
                })
            });
            res.status(200);
        } else if (signin.data.message == 'pswd') {

        } else {

        }
    }
    response.send(data);
    response.end();
});
app.post('/signup', async(request, response) => {
    let data;
    response.contentType("application/json");
    if (request.body.mail == "" || request.body.pswd == "")
        response.status(400);
    else {
        request.body.pswd = crypto.createHash("sha256").update(request.body.pswd).digest("hex");
        data = await radioShowManagerDao.createRadioShowManager(request.body);
        req.session.regenerate(function(err) {
            if (err) next(err)
            req.session.managerId = radioShowManagerDao.signInRadioShowManager(request.body).data.result.managerId;
            req.session.save(function(err) {
                if (err) return next(err)
            })
        })
        response.status(200);
    }
    response.send(data);
    response.end();
});
app.use('/api/radioShow', daoRouter);
app.get('/logout', (req, res, next) => {
    req.session.user = null
    req.session.save(function(err) {
        if (err) next(err)
        req.session.regenerate(function(err) {
            if (err) next(err)
            res.redirect('/')
        })
    })
});
/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).redirect('/oops.html');
});
app.get("*", (request, response) => {
    response.status(404).redirect("/notFound.html");
    response.end();
});
app.post("*", (request, response) => {
    response.status(400).redirect("/error.html");
    response.end();
});
app.listen(port, () => {
    console.log(`URadio app listening at http://localhost:${port}`);
});
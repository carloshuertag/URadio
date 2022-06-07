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
const mailRegex = '([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}';
const pswdRegex = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';
app.post('/signin', async(request, response) => {
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
app.post('/signup', async(request, response) => {
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
app.use('/api/radioShow', daoRouter);
app.get('/logout', (request, response, next) => {
    request.session.user = null
    request.session.save(function(err) {
        if (err) next(err)
        request.session.regenerate(function(err) {
            if (err) next(err)
            response.redirect('/')
        })
    })
});
/* Error handler middleware */
app.use((err, request, response, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    response.status(statusCode).redirect('/oops.html');
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
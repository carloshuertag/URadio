require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const port = process.env.port;
const daoRouter = require("./routes/radioShowDao");
const formsRouter = require("./routes/forms");
const castRouter = require("./routes/castDao");
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
app.use("", formsRouter);
app.use('/api/radioShow', daoRouter);
app.use((err, request, response, next) => { // Error handler middleware
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
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const port = process.env.port;
const daoRouter = require("./routes/radioShowDao");
const radioShowManagerDao = require("./services/radioShowManagerDao");
const castRouter = require("./routes/castDao");
const helmet = require("helmet");
app.use(
    session({
        secret: "uradiosessionasies",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true, maxAge: 300000 },
    })
);
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(helmet());
app.use(express.static("../frontend/"));
app.post("/signup", async(request, response) => {
    let data;
    console.log(request);
    response.contentType("application/json");
    if (request.body.mail == "" || request.body.password == "")
        response.status(400);
    else {
        data = await radioShowManagerDao.createRadioShowManager(request.body);
        response.status(200);
    }
    response.send(data);
    response.end();
    console.log(data);
});
app.use("/api/radioShow", daoRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});
app.listen(port, () => {
    console.log(`URadio app listening at http://localhost:${port}`);
});
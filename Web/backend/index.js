require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.port;
const daoRouter = require("./routes/radioShowDao");
const castRouter = require("./routes/castDao");
const helmet = require("helmet");

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(helmet());
app.use(express.static("../frontend/"));
app.get("/ok", (req, res) => {
    res.json({ message: "ok" });
});
app.use("/radioShow", daoRouter);
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
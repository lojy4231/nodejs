const express = require("express");
const connect = require("./schemas");
const app = express();
const port = 3000;

const postRouter = require("./routes/posts");

const requestMiddleware = (req, res, next) => {
    console.log("Request URL:", req.originalUrl, "-", new Date());
    next();
};

connect();

app.use(express.json());
app.use(requestMiddleware);

app.use("/api", [postRouter]);

app.get("/", (req, res) => {
    res.send("Wellcome lojy's blog")
});

app.listen(port, () => {
    console.log(port, "포트로 서버가 켜졌어요")
});
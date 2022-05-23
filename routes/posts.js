const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("this is post page")
});

const posts = [
    {
        postNum: 1,
        title: "test1",
        userId: "test1",
        date: "2022-05-23",
        content: "test1",
    },
    {
        postNum: 2,
        title: "test2",
        userId: "test2",
        date: "2022-05-23",
        content: "test2",
    },
    {
        postNum: 3,
        title: "test3",
        userId: "test3",
        date: "2022-05-23",
        content: "test3",
    },
    {
        postNum: 4,
        title: "test4",
        userId: "test4",
        date: "2022-05-23",
        content: "tes4",
    },
];

router.get("/posts", (req, res) => {
    res.json({
        posts,
    });
});

router.get("/posts/:postNum", (req, res) => {
    const { postNum } = req.params;
    const [detail] = posts.filter((posts) => posts.postNum === Number(postNum));
	res.json({ 
        detail,
    });
});

module.exports = router;
const express = require("express");
const Post = require("../schemas/post");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("this is post page")
});

// const posts = [
//     {
//         postNum: 1,
//         title: "test1",
//         userId: "test1",
//         date: "2022-05-23",
//         content: "test1",
//     },
//     {
//         postNum: 2,
//         title: "test2",
//         userId: "test2",
//         date: "2022-05-23",
//         content: "test2",
//     },
//     {
//         postNum: 3,
//         title: "test3",
//         userId: "test3",
//         date: "2022-05-23",
//         content: "test3",
//     },
//     {
//         postNum: 4,
//         title: "test4",
//         userId: "test4",
//         date: "2022-05-23",
//         content: "tes4",
//     },
// ];

router.get("/posts", async (req, res) => {
    const { title } = req.query;

    const posts = await Post.find({ title });

    res.json({
        posts,
    });
});

router.get("/posts/:postNum", (req, res) => {
    const { postNum } = req.params;
    const [detail] = Post.find({ postNum: Number(postNum) });
	res.json({ 
        detail,
    });
});

router.post("/posting", async (req, res) => {
    const { postNum, title, userId, password, date, content } = req.body;

    const posts = await Post.find({ postNum });
    if (posts.length) {
        return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터 입니다." });
    }

    const createdPost = await Post.create({ postNum, title, userId, password, date, content });

    res.json({ post: createdPost });
});

module.exports = router;
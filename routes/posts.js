const express = require("express");
const Post = require("../schemas/post");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("this is post page")
});

router.get("/posts", async (req, res) => {
    const { title } = req.query;

    const posts = await Post.find({ title });

    res.json({
        posts,
    });
});

router.get("/posts/:postNum", async (req, res) => {
    const { postNum } = req.params;

    const [detail] = await Post.find({ postNum: Number(postNum) });
	res.json({ 
        detail,
    });
});

router.delete("/posts/:postNum", async (req, res) => {
    const { postNum } = req.params;
    
    const existPost = await Post.find({ postNum: Number(postNum) });
    if(existPost.length){
        await Post.deleteOne({ postNum: Number(postNum) });
    }
    
    res.json({ success: true });
});

router.put("/posts/:postNum", async (req, res) => {
    const { postNum } = req.params;
    const { content } = req.body;

    const existPost = await Post.find({  postNum: Number(postNum) });
    if(existPost.length){
        await Post.updateOne({ postNum: Number(postNum) }, { $set: { content }});
    }

    res.json({ success: true });
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
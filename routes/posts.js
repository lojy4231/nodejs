const express = require("express");
const Post = require("../models/post");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

router.get("/", (req, res) => {
    res.send("this is post page")
});


// 게시글 조회 (최신 날짜 순으로)
router.get("/posts", async (req, res) => {
    const { postNum } = req.query;

    const posts = await Post.find({ postNum }, { title:1, userId:1, date:1 }).sort({date: -1});

    res.json({
        posts,
    });
});


// 게시글 상세 조회
router.get("/posts/:postNum", async (req, res) => {
    const { postNum } = req.params;

    const [detail] = await Post.find({ postNum: Number(postNum) }, { title:1, userId:1, date:1, content:1 });
	res.json({ 
        detail,
    });
});


// 게시글 삭제
router.post("/posts/:postNum", async (req, res) => {
    const { postNum } = req.params;
    const { password } = req.body;

    const existPost = await Post.find({password });
    if(!existPost.length){
        return res.status(400).json({ success: false, errorMessage: " 비밀번호가 다릅니다." });    
    }
        const deletePost = await Post.deleteOne({ postNum: Number(postNum) });
    
    res.json({ delete: deletePost });
});

// 게시글 수정
router.put("/posts/:postNum", async (req, res) => {
    const { postNum } = req.params;
    const { content } = req.body;
    const { password } = req.body;

    const existPost = await Post.find({ password });
    if(!existPost.length){
        return res.status(400).json({ success: false, errorMessage: " 비밀번호가 다릅니다." });    
    }

        await Post.updateOne({ postNum: Number(postNum) }, { $set: { content }});

    res.json({ success: true });
});


// 게시글 작성
router.post("/posting", async (req, res) => {
    const { title, userId, password, date, content } = req.body;
    const maxPostNum = await Post.findOne().sort("-postNum").exec();
    let postNum = 1;

    if (maxPostNum) {
        postNum = maxPostNum.postNum +1;
    }

    const post = new Post({ postNum, title, userId, password, date, content });
    await post.save();

    res.send({ post });
});

module.exports = router;
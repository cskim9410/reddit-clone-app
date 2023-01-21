import { Request, Response, Router } from "express";
import Comment from "../entities/Comment";
import Post from "../entities/Post";
import { User } from "../entities/User";
import userMiddleware from "../middlewares/user";

const getUserData = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
      select: ["username", "createdAt"],
    });
    const posts = await Post.find({
      where: { username: user.username },
      relations: ["comments", "votes", "sub"],
    });
    const comments = await Comment.find({
      where: { username: user.username },
      relations: ["post"],
    });

    if (res.locals.user) {
      posts.forEach((post) => post.setUserVote(res.locals.user));
      comments.forEach((comments) => comments.setUserVote(res.locals.user));
    }

    res.json({ user, posts, comments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "에러가 발생 했습니다." });
  }
};

const router = Router();
router.get("/:username", userMiddleware, getUserData);

export default router;

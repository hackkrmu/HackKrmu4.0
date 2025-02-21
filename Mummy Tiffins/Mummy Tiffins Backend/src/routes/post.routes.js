import express from "express";
import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.controllers.js";


const postRouter = express.Router();

postRouter.route("/create-post").post(createPost);
postRouter.route("/get-posts").get(getPosts);
postRouter.route("/get-post/:id").get(getPost);
postRouter.route("/update-post/:id").put(updatePost);
postRouter.route("/delete-post/:id").delete(deletePost);

export default postRouter;
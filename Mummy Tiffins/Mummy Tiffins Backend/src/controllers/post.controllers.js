import prisma from "../../helpers/prisma.js";

export const createPost = async (req, res) => {
    try {
        const { title, content, authorId, quantity, serving } = req.body;
        const author = await prisma.user.findUnique({
            where: {
                id: authorId,
            },
        });
        if (!author) {
            return res.status(404).json({ message: `Author not found` });
        }
        const newPost = await prisma.post.create({
        data: {
            title,
            content,
            authorId,
            author,
            quantity,
            serving,
        },
        });
        res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Failed creating a post :(` });
    }
    }

export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        res.status(200).json(posts);
    }   
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Failed fetching posts :(` });
    }
    }

export const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        if (!post) {
            return res.status(404).json({ message: `Post not found` });
        }
        res.status(200).json(post);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Failed fetching post :(` });
    }
    }

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, quantity, serving } = req.body;
        const post = await prisma.post.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title,
                content,
                quantity,
                serving,
            },
        });
        res.status(200).json(post);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Failed updating post :(` });
    }
    }

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.post.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json(post);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Failed deleting post :(` });
    }
    }


import { Response, Request } from 'express';
import { create, getPostById } from '../services/postService';

export const getPosts = async (req: Request, res: Response) => {
    res.json({
        msg: 'getPosts',
    });
};

export const getPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post = await getPostById(id);

        res.json({
            post,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error',
            error: error,
        });
    }
};

export const createPost = async (req: Request, res: Response) => {
    try {
        const { body } = req;

        const post = await create(body);

        console.log(post);

        res.json({
            msg: `Post ${post.id} created by ${post.owner}`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error',
            error: error,
        });
    }
};

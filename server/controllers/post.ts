import { Response, Request } from 'express';
import { create, getAll, getPostById } from '../services/postService';
import { getById } from '../services/accountService';

export const getPosts = async (req: Request, res: Response) => {
    const posts = await getAll();

    const formattedPosts = await Promise.all(
        posts.map(async (post) => {
            const account = await getById(post.owner);
            return {
                id: post.id,
                title: post.title,
                content: post.content,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
                ownerId: post.owner,
                owner: account?.username,
            };
        })
    );

    res.status(200).json({
        posts: formattedPosts,
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
            error: 'Talk to the administrator',
        });
    }
};

import { Router } from 'express';
import { check } from 'express-validator';

import { createPost, getPost, getPosts } from '../controllers/post';
import validateFields from '../middlewares/validate-fields';
import { contentExists, titleExists } from '../helpers/db-validators';

const router = Router();

router.get('/', getPosts);

router.get('/:id', getPost);

router.post(
    '/',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('title', 'Title must be less than 50 characters').isLength({
            max: 50,
        }),
        check('title').custom(titleExists),
        check('content', 'Content is required').not().isEmpty(),
        check('content').custom(contentExists),
        check('owner', 'Owner is required').not().isEmpty(),
        check('owner', 'Owner must be a valid UUID').isUUID(),
        validateFields,
    ],
    createPost
);

export default router;

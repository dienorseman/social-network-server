import { Router } from "express";

import { getAccounts, postAccount } from "../controllers/account";
import validateFields from "../middlewares/validate-fields";
import { check } from "express-validator";
import { emailExists } from "../helpers/db-validators";

const router = Router();

router.get('/', getAccounts);

router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('email').custom(emailExists),
    validateFields,
], postAccount);

export default router;
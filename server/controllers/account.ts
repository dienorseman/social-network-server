import { Request, Response } from 'express';
import bycript from 'bcryptjs';

import { create, getAll, getById } from '../services/accountService';

const getAccounts = async (req: Request, res: Response) => {
    try {
        const accounts = await getAll();
        res.json({
            accounts,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Talk to the administrator'
        });
    }
};

export const getAccountById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const account = await getById(id);
        res.json({
            account,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Talk to the administrator',
        });
    }
};

const postAccount = async (req: Request, res: Response) => {
    try {
        console.log('creating account...');

        const { body } = req;

        // Encrypt password
        const salt = bycript.genSaltSync(10);
        body.password = bycript.hashSync(body.password, salt);

        await create(body);

        const { email, username } = body;

        res.json({
            msg: `Welcome ${username}!`,
            body: {
                email,
                username,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Talk to the administrator'
        });
    }
};

export { getAccounts, postAccount };

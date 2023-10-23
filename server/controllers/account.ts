import { Request, Response } from 'express';
import bycript from 'bcryptjs';

import Account from '../models/account';

const getAccounts = async (req: Request, res: Response) => {
    try {
        const accounts = await Account.findAll();
        res.json({
            msg: 'getAccounts',
            accounts,
        });
    } catch ( error ) {
        res.status(500).json({
            msg: 'Error',
            error: error,
        });
    }
};

const getAccount = async (req: Request, res: Response) => {
    
};

const postAccount = async (req: Request, res: Response) => {

    try {
        console.log('creating account...');
        
        const { body } = req;

        // Encrypt password
        const salt = bycript.genSaltSync(10);
        body.password = bycript.hashSync(body.password, salt);

        await Account.create(body);

        const { email, username } = body;

        res.json({
            msg: `Welcome ${username}!`,
            body: {
                email,
                username,
            },
        });
    
    } catch (error) {
        res.status(500).json({
            msg: 'Error',
            error: error,
        });
    }


};

export { getAccounts, postAccount };

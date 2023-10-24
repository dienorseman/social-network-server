import e, { NextFunction, Request, Response } from 'express';

const { validationResult } = require('express-validator');

const validateFields = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(
            errors.array().map((error: any) => {
                return {
                    msg: error.msg,
                    field: error.path,
                    location: error.location,
                };
            })
        );
    }
    next();
};

export default validateFields;

import Account from '../models/account';

export const emailExists = async (email: string) => {

    email = email.toLowerCase();

    const account = await Account.findOne({
        where: {
            email,
        },
    });

    if (account) {
        throw new Error(`Email ${email} already exists`);
    }
};

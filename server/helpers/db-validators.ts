import Account from '../models/account';
import Post from '../models/post';

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

export const titleExists = async (title: string) => {
    const post = await Post.findOne({
        where: {
            title,
        },
    });

    if (post) {
        throw new Error(`Title ${title} already exists`);
    }
};

export const usernameExists = async (username: string) => {

    username = username.toLowerCase();
    
    const account = await Account.findOne({
        where: {
            username,
        },
    });

    if (account) {
        throw new Error(`Username ${username} already exists`);
    }
};

export const contentExists = async (content: string) => {
    const post = await Post.findOne({
        where: {
            content,
        },
    });

    if (post) {
        throw new Error(`Content already exists`);
    }
}
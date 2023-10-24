import Post, { PostInput, PostOutput } from "../models/post";

export const create = async( payload: PostInput ): Promise<PostOutput> => {
    return Post.create( payload );
}

export const getPostById = async( id: string ): Promise<PostOutput | null> => {
    return Post.findByPk( id );
}

export const getAll = async(): Promise<PostOutput[]> => {
    return Post.findAll();
}
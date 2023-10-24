import { DataTypes, Model, Optional } from 'sequelize';
import db from '../db/connection';

interface PostAttributes {
    id: string;
    visible: boolean;
    title: string;
    content: string;
    owner: string;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface PostInput extends Optional<PostAttributes, 'id' | 'visible'> {}

export interface PostOutput extends Required<PostAttributes> {
    id: string;
    visible: boolean;
    title: string;
    content: string;
    owner: string;

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

class Post extends Model<PostAttributes, PostInput> implements PostAttributes {
    public id!: string;
    public visible!: boolean;
    public title!: string;
    public content!: string;
    public owner!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Post.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            field: 'Id',
        },
        visible: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: 'Visible',
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'Title',
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Content',
        },
        owner: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            field: 'Owner',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'CreatedAt',
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'UpdatedAt',
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'DeactivatedAt',
        },
    },
    {
        paranoid: true,
        timestamps: true,
        tableName: 'Post',
        sequelize: db,
    }
);

export default Post;

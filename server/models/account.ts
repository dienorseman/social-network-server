import { DataTypes, Optional, Model } from 'sequelize';
import db from '../db/connection';

interface AccountAttributes {
    id: string;
    email: string;
    username: string;
    password: string;
    active: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface AccountInput extends Optional<AccountAttributes, 'id'> {}

export interface AccountOutput extends Required<AccountAttributes> {}

class Account extends Model<AccountAttributes, AccountInput> implements AccountAttributes {
    public id!: string;
    public email!: string;
    public username!: string;
    public password!: string;
    public active!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    public static async findbyId(id: string) {
        return Account.findByPk(id);
    }
}

Account.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            field: 'Id',
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            field: 'Email',
        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            field: 'Username',
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'Password',
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: 'Active',
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
            field: 'DeactivatedAt',
        },
    },
    {
        paranoid: true,
        tableName: 'Account',
        sequelize: db,
    }
);

export default Account;

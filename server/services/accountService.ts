import Account, { AccountInput, AccountOutput } from '../models/account';

export const getAll = async (): Promise<AccountOutput[]> => {
    return Account.findAll();
}

export const getById = async (id: string): Promise<AccountOutput | null> => {
    return Account.findByPk(id);
};

export const create = async (payload: AccountInput): Promise<AccountOutput> => {
    return Account.create(payload);
};

import { User } from '../../accounts/infra/sequelize/entities/User';

export interface CreateGameDTO {
    name: string;
    user: User;
    userId: string;
}

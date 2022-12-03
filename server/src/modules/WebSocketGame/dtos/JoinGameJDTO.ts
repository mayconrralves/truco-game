import { User } from '../../accounts/infra/sequelize/entities/User';

export interface JoinGameDTO {
    uuid: string;
    user: User;
    userId: string;
}

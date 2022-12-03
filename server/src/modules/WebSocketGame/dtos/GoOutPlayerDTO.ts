import { User } from '../../accounts/infra/sequelize/entities/User';

export interface GoOutPlayerDTO {
    uuid: string;
    user: User;
}

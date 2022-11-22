import { instanceToInstance } from 'class-transformer';
import { IResponseUserDTO } from '../dtos/IResponseUserDTO';
import { User } from '../infra/sequelize/entities/User';

export class UserMap {
    static toDTO({ id, name, email }: User): IResponseUserDTO {
        const user = instanceToInstance({
            id,
            name,
            email,
        });
        return user;
    }
}

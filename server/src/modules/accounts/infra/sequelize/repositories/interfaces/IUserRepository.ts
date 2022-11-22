import { UserRepositoryDTO } from '../../../../dtos/UserRepositoryDTO';
import { User } from '../../entities/User';

interface IUserRepository {
    create({ name, email, password }: UserRepositoryDTO): Promise<User>;
    update(user: User): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
    findUserById(id: number): Promise<User | null>;
}

export { IUserRepository };

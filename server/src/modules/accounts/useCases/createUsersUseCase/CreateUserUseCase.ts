import { inject, injectable } from 'tsyringe';
import { IResponseUserDTO } from '../../dtos/IResponseUserDTO';
import { IUserRepository } from '../../infra/sequelize/repositories/interfaces/IUserRepository';
import { UserMap } from '../../mappers/UserMap';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository
    ) {}
    async execute({
        name,
        email,
        password,
    }: IRequest): Promise<IResponseUserDTO> {
        const userAlreadyExists = await this.usersRepository.findUserByEmail(
            email
        );
        if (userAlreadyExists) {
            throw new Error('User already exists');
        }
        const user = await this.usersRepository.create({
            name,
            email,
            password,
        });
        return UserMap.toDTO(user);
    }
}

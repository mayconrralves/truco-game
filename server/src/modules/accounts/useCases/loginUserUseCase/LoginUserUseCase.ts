import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../infra/sequelize/repositories/interfaces/IUserRepository';

interface IRequest {
    email: string;
    password: string;
}

@injectable()
export class LoginUserUseCase {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository
    ) {}
    async execute({ email, password }: IRequest): Promise<string> {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw Error('Email or Password is incorrect');
        }
        if (user.password !== password) {
            // throw Error('Email or Password is incorrect');
            console.log('Error');
            return '';
        }
        const token = sign({}, process.env.SECRET_JWT!, {
            subject: user.id.toString(),
            expiresIn: '15d',
        });
        return token;
    }
}

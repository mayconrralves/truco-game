import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { User } from '../../infra/sequelize/entities/User';
import { IUserRepository } from '../../infra/sequelize/repositories/interfaces/IUserRepository';

export interface IRequest {
    email: string;
    password: string;
}

export interface IResponse {
    user?: User;
    token?: string;
}

@injectable()
export class LoginUserUseCase {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository
    ) {}
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw Error('Email or Password is incorrect');
        }
        if (user.password !== password) {
            // throw Error('Email or Password is incorrect');
            console.log('Error');
            return {};
        }
        const token = sign({}, process.env.SECRET_JWT!, {
            subject: user.id.toString(),
            expiresIn: '15d',
        });
        return {
            user,
            token,
        };
    }
}

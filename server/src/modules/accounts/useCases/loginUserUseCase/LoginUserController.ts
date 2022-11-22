import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { LoginUserUseCase } from './LoginUserUseCase';

export class LoginUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        const loginUserUseCase = container.resolve(LoginUserUseCase);
        const token = await loginUserUseCase.execute({
            email,
            password,
        });
        return response.json(token);
    }
}

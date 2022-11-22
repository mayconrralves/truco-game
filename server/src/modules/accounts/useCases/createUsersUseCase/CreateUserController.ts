import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, name, password } = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);
        const data = await createUserUseCase.execute({
            email,
            name,
            password,
        });
        return response.json(data);
    }
}

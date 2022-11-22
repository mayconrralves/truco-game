import { container } from 'tsyringe';
import { IUserRepository } from '../../modules/accounts/infra/sequelize/repositories/interfaces/IUserRepository';
import { UserRepository } from '../../modules/accounts/infra/sequelize/repositories/UserRepository';

container.registerSingleton<IUserRepository>('UsersRepository', UserRepository);

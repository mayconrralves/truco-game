import { Sequelize } from 'sequelize-typescript';
import { User } from '../modules/accounts/infra/sequelize/entities/User';

export default () => {
    const sequelize: Sequelize = new Sequelize({
        username: 'postgres',
        password: 'postgres',
        database: 'truco-database-dev',
        host: '127.0.0.1',
        dialect: 'postgres',
        //impedir que o nome da tabela vai para o plural
        define: {
            freezeTableName: true,
        },
    });

    sequelize.addModels([User]);
    console.log('start database');
    return sequelize;
};

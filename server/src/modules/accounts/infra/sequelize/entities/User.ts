import {
    Column,
    CreatedAt,
    PrimaryKey,
    Table,
    UpdatedAt,
    Model,
    AutoIncrement,
} from 'sequelize-typescript';

@Table
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    name: string;

    @Column
    email: string;

    @Column
    password: string;

    @UpdatedAt
    updatedAt: Date;

    @CreatedAt
    createdAt: Date;
}

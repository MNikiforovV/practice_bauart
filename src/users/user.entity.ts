import { Exclude } from 'class-transformer';
import Role from 'src/users/roles/role.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
      })
    public role: Role

    @Column({
      nullable: true
    })
    @Exclude()
    public currentHashedRefreshToken?: string;
}

export default User;
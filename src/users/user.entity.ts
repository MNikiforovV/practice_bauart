import { Exclude } from 'class-transformer';
import Project from 'src/projects/entities/project.entity';
import Role from 'src/users/roles/role.enum';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

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

    @OneToMany(() => Project, (project: Project) => project.author)
    public projects: Project[];

    @ManyToOne(() => User, (subscriber: User) => subscriber.projects)
    public subscriber: User;

  }

export default User;
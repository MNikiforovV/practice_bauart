import { Exclude } from 'class-transformer';
import Project from 'src/projects/entities/project.entity';
import Role from 'src/users/roles/role.enum';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany } from 'typeorm';

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

    // @ManyToMany(() => Project, (project: Project) => project.subscribers)
    // public subscribed: Project[];

    // @ManyToOne(() => Project, (project: Project) => project.subscribers)
    // public subscribed: Project[];

  }

export default User;
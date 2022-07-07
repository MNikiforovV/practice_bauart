import { Exclude } from 'class-transformer';
import Donations from 'src/ideas/entities/donations.entity';
import Project from 'src/projects/entities/project.entity';
import Subscriber from 'src/projects/entities/subscriber.entity';
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

    @OneToMany(() => Subscriber, (subscriber: Subscriber) => subscriber.user)
    public subscribed: Subscriber[];

    // @OneToMany(() => Donations, (donations: Donations) => donations.user)
    // public donations: Donations[];

  }

export default User;
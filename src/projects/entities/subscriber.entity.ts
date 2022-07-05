import Project from "src/projects/entities/project.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../../users/entities/user.entity";

@Entity()
class Subscriber {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Project, (project: Project) => project.subscribers)
    projectId: Project;

    @ManyToOne(() => User, (user: User) => user.projects)
    userId: User;


    // @OneToMany(() => Project, (project: Project) => project.author)
    // public projects: Project[];

    // @ManyToMany(() => Project, (project: Project) => project.subscribers)
    // public subscribed: Project[];

    // @ManyToOne(() => Project, (project: Project) => project.subscribers)
    // public subscribed: Project[];

  }

export default Subscriber;
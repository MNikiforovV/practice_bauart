import User from "src/users/user.entity";
import { BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Project {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  slug: string;
 
  @Column()
  public title: string;
 
  @Column()
  public content: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  created: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  updated: Date;
 
  @BeforeUpdate()
  updateTimestamp() {
    this.updated = new Date;
  }

  @ManyToOne(() => User, (author: User) => author.projects)
  public author: User;

  @OneToMany(() => Project, (project: Project) => project.subscribers)
  public subscribers: User[];

}

export default Project;
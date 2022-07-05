import Subscriber from "src/projects/entities/subscriber.entity";
import User from "src/users/entities/user.entity";
import { BeforeUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @OneToMany(() => Subscriber, (subscriber: Subscriber) => subscriber.projectId)
  public subscribers: Subscriber[];

  // @ManyToMany(() => User, (subscriber: User) => subscriber.subscribed)
  // @JoinTable()
  // public subscribers: User[];

}

export default Project;
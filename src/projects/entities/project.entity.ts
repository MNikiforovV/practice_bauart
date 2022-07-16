import Idea from 'src/ideas/entities/idea.entity';
import Subscriber from 'src/projects/entities/subscribers.entity';
import User from 'src/users/entities/user.entity';
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated = new Date();
  }

  @ManyToOne(() => User, (author: User) => author.projects, {
    onDelete: 'CASCADE',
  })
  public author: User;

  @OneToMany(() => Subscriber, (subscriber: Subscriber) => subscriber.project)
  public subscribers: Subscriber[];

  @OneToMany(() => Idea, (idea: Idea) => idea.project)
  public ideas: Idea[];
}

export default Project;

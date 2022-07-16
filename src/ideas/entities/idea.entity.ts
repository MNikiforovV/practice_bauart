import Project from 'src/projects/entities/project.entity';
import { BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Discussion from './discussion.entity';
import Fundraising from '../../fundraising/entities/fundraising.entity';
import User from 'src/users/entities/user.entity';

@Entity()
class Idea {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public slug: string;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column({ default: false })
  public isArchived: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @ManyToOne(() => User, (author: User) => author.projects, {
    onDelete: 'CASCADE',
  })
  public author: User;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated = new Date();
  }

  @ManyToOne(() => Project, (user: Project) => user.ideas, {
    onDelete: 'CASCADE',
  })
  public project: Project;

  @OneToOne(() => Discussion)
  @JoinColumn()
  public discussion: Discussion;

  @OneToOne(() => Fundraising)
  public fundraising: Fundraising;
}

export default Idea;

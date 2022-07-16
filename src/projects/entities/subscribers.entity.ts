import Project from 'src/projects/entities/project.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '../../users/entities/user.entity';

@Entity()
class Subscribers {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project: Project) => project.subscribers, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @ManyToOne(() => User, (user: User) => user.projects, {
    onDelete: 'CASCADE',
  })
  user: User;
}

export default Subscribers;

import User from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Discussion from './discussion.entity';

@Entity()
class Message {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public created: Date;

  @ManyToOne(
    () => Discussion,
    (discussion: Discussion) => discussion.messages,
    {
      onDelete: 'CASCADE',
    },
  )
  public discussion: Discussion;

  @ManyToOne(() => User, (author: User) => author.projects, {
    onDelete: 'CASCADE',
  })
  public author: User;
}

export default Message;

import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Idea from './idea.entity';
import Message from './message.entity';

@Entity()
class Discussion {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne(() => Idea, (idea: Idea) => idea.discussion, {
    onDelete: 'CASCADE',
  })
  public idea: Idea;

  @OneToMany(() => Message, (message: Message) => message.discussion)
  public messages: Message[];
}

export default Discussion;

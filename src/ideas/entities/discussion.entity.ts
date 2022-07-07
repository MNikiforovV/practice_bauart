
import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Idea from "./idea.entity";

@Entity()
class Discussion {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne(() => Idea, (idea: Idea) => idea.discussion, {
    onDelete: 'CASCADE'
  })
  public idea: Idea;

  // @OneToMany(() => Messages, (messages: Messages) => messages.messages)
  // public messages: Messages[];

}

export default Discussion;
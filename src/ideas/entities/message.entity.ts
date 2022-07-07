
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Discussion from "./discussion.entity";


@Entity()
class Message {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public content: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  public created: Date;

  @ManyToOne(() => Discussion, (discussion: Discussion) => discussion.messages, {
    onDelete: 'CASCADE'
  })
  public discussion: Discussion;

}

export default Message;
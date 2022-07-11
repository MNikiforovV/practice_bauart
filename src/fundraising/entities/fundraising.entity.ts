import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Donations from "./donations.entity";
import Idea from "../../ideas/entities/idea.entity";

@Entity()
class Fundraising {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public goal: number;

  @Column({ nullable: true })
  public title: string;

  @OneToOne(() => Idea, (idea: Idea) => idea.fundraising)
  @JoinColumn()
  public idea: Idea;

  @OneToMany(() => Donations, (donations: Donations) => donations.fundraising)
  public donations: Donations[];


}

export default Fundraising;
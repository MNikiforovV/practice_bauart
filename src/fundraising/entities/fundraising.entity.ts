import { BeforeUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Donations from "./donations.entity";
import Idea from "../../ideas/entities/idea.entity";

@Entity()
class Fundraising {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public goal: number;

  @OneToOne(() => Idea, (idea: Idea) => idea.fundraising)
  public idea: Idea;

  @OneToMany(() => Donations, (donations: Donations) => donations.fundraising)
  public donations: Donations[];


}

export default Fundraising;
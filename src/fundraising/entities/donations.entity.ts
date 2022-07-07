import User from "src/users/entities/user.entity";
import { BeforeUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Fundraising from "./fundraising.entity";

@Entity()
class Donations {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public money: number;

  @ManyToOne(() => User, (user: User) => user.projects, {
    onDelete: 'CASCADE'
  })
  public user: User;

  @ManyToOne(() => Fundraising, (fundraising: Fundraising) => fundraising.donations, {
    onDelete: 'CASCADE'
  })
  public fundraising: Fundraising;

}

export default Donations;
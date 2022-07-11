import User from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Fundraising from "./fundraising.entity";

@Entity()
class Donations {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public money: number;

  @Column({default: false})
  public check: boolean;

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
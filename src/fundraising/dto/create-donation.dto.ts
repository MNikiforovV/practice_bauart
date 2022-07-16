import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateDonationDto {
  @IsNumberString()
  @IsNotEmpty()
  public money: number;
}

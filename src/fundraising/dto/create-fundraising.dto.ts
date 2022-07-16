import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class CreateFundraisingDto {
  @IsNumberString()
  @IsNotEmpty()
  public goal: number;

  public title: string;
}

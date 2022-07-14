import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIdeaDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public content: string;
}

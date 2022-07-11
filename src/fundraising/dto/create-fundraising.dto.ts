import { IsNotEmpty, IsString } from "class-validator";

export class CreateFundraisingDto {
    @IsString()
    @IsNotEmpty()
    public goal: number;

    public title: string;
}

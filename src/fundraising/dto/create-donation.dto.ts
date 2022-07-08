import { IsNotEmpty, IsString } from "class-validator";

export class CreateDonationDto {
    @IsString()
    @IsNotEmpty()
    public money: number;
}

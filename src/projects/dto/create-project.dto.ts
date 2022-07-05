import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {

    @IsString()
    @IsNotEmpty()
    public title: string;
    
    @IsString()
    @IsNotEmpty()
    public content: string;
}
export default CreateProjectDto
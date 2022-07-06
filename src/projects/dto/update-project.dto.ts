import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateProjectDto { //extends PartialType(CreateProjectDto) {
    @IsString()
    @IsNotEmpty()
    public title: string;
    
    @IsString()
    @IsNotEmpty()
    public content: string;
}

import { IsString, IsInt, Min, IsOptional } from 'class-validator';

class CreateCourseDto {
    @IsString()
    public abbreviation: string;

    @IsString()
    public title: string;

    @IsString()
    public instructor: string;

    @IsInt()
    @Min(1)
    public capacity: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    public enrolled: number;
}

export default CreateCourseDto;

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GenerateEmailDto {
    @IsString()
    @IsNotEmpty()
    raw_message: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsOptional()
    tone: string = 'formal';

    @IsString()
    @IsOptional()
    target_audience?: string;
}

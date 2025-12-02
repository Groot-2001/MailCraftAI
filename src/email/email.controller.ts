import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { GenerateEmailDto } from './dto/generate-email.dto';

@Controller('email')
export class EmailController {
    constructor(private readonly service: EmailService) { }

    @Post('generate')
    async generate(@Body() dto: GenerateEmailDto) {
        return this.service.generateEmail(dto);
    }
}

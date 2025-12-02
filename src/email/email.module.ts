import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailEntity } from './entities/email.entity';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { PerplexityModule } from '../perplexity/perplexity.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailEntity]),
    PerplexityModule,
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule { }

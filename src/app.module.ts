import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import Env from './config/Env';
import { DatabaseModule } from './database/database.module';
import { PerplexityModule } from './perplexity/perplexity.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Env],
      // validationSchema: EnvValidation,
    }),
    EmailModule,
    DatabaseModule,
    PerplexityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

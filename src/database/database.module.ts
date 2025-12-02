import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './typeorm.config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                const options = typeOrmConfig(config) as PostgresConnectionOptions;

                const logger = new Logger('DatabaseModule');
                logger.log(
                    `Connecting to PostgreSQL at ${options.host}:${options.port}/${options.database}`,
                );
                console.log(
                    `Connecting to PostgreSQL at ${options.host}:${options.port}/${options.database}`,
                );
                return options;
            },
        }),
    ],
})
export class DatabaseModule { }

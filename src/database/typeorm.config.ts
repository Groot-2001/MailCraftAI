import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig = (
    config: ConfigService,
): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: config.get('database.host'),
    port: config.get('database.port'),
    username: config.get('database.username'),
    password: config.get('database.password'),
    database: config.get('database.name'),
    autoLoadEntities: true,
    synchronize: true,
});

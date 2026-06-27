import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Service } from './services/service.entity';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './auth/auth.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'freelancehub',
      entities: [User, Service],
      synchronize: true,
    }),
    UsersModule,
    ServicesModule,
    AuthModule,
    PublicModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../services/service.entity';
import { PublicController } from './public.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  controllers: [PublicController],
})
export class PublicModule {}

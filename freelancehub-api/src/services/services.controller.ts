import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('services')
@ApiBearerAuth()
@Controller('services')
export class ServicesController {
  constructor(@InjectRepository(Service) private serviceRepo: Repository<Service>) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Publicar servicio' }) 
  async createService(@Request() req: any, @Body() dto: CreateServiceDto) {
    const providerId = req.user.userId;
    const newService = this.serviceRepo.create({
      ...dto,
      provider: { id: providerId },
    });
    return await this.serviceRepo.save(newService);
  }
}
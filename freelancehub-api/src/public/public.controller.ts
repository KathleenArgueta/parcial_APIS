import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../services/service.entity';

@ApiTags('public')
@Controller('public')
export class PublicController {
  constructor(@InjectRepository(Service) private serviceRepo: Repository<Service>) {}

  @Get('services')
  @ApiOperation({ summary: 'Explorar catálogo de servicios' })
  async getPublicServices() {
    const services = await this.serviceRepo.find({ relations: { provider: true } });
    return services.map((s) => ({
      title: s.title,
      category: s.category,
      price: s.price,
      freelancerName: s.provider ? s.provider.name : 'Desconocido',
    }));
  }
}
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('proxy')
@Controller('proxy')
export class ProxyController {
  // This controller will handle proxying requests to other microservices
  // Implementation will be added based on specific microservice requirements
}
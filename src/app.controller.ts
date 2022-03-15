import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Health check')
export class AppController {
  @Get('ping')
  healthCheck(): string {
    return 'pong';
  }
}

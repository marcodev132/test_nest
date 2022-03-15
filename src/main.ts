import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllExceptionFilter } from './exception-interceptor/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter());
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Payment Subscription')
    .setDescription('The APIs of Payment Subscription Service')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header',
      },
      'apiKey',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3001;
  app.enableCors();
  await app.listen(port);
}
bootstrap();

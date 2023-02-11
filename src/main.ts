import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyMultipart from '@fastify/multipart'; '@fastify/multipart';
import { AppModule } from './app.module';
const PORT:number = parseInt(process.env.PORT) || 5600; 
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.register(fastifyMultipart);
  app.enableCors();
  await app.listen(PORT, () => console.log(`Server has been started on ${PORT}`));
}
bootstrap();
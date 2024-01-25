import * as process from "process";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as date from "./utils/date";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipe";

async function start() {
  const PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || 'localhost';
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NestTest')
    .setDescription('Test documentation')
    .setVersion('1.0.0')
    .addTag('2tmirleid')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () => {
    console.log(`[${date.DateNow.dateNow}] :: [Application has been started]`);
  });
}

start();
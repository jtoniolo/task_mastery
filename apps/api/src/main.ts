import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import LokiTransport from 'winston-loki';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    logger: createLogger(),
  });
  app.set('trust proxy', process.env.TRUSTED_PROXIES || false);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.enableCors({
    origin: process.env.CORS_ORIGINS.split(',')
      .map((origin) => origin.trim())
      .find((origin) => origin.length > 0),
    credentials: true,
  });
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The Email Sweeperr API documentation')
    .setVersion('1.0')
    .addOAuth2()
    .addBearerAuth()
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

function createLogger() {
  const list: winston.transport[] = [];

  if (process.env.LOKI_HOST) {
    list.push(
      new LokiTransport({
        host: process.env.LOKI_HOST,
        batching: true,
        basicAuth: process.env.LOKI_BASIC_AUTH
          ? process.env.LOKI_BASIC_AUTH
          : undefined,
        onConnectionError: (err) => console.error(err),
        labels: { job: 'nestjs-logs', app: 'api', env: process.env.NODE_ENV },
        json: true,
      }),
    );
  }

  return WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple(),
          nestWinstonModuleUtilities.format.nestLike('api', {
            colors: true,
            prettyPrint: true,
            processId: true,
            appName: true,
          }),
        ),
      }),
      new winston.transports.File({
        filename: 'application.log',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
      }),
      ...list,
    ],
  });
}

bootstrap();

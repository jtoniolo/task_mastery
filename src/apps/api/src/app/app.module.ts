import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { AuthController } from '../auth/auth.controller';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/entities/user.entity';
// import { Message } from './gmail/gmail.entity';
// import { GmailModule } from './gmail/gmail.module';
// import { GmailController } from './gmail/gmail.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev.local'], //, '.env.dev', '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGODB_URI'),
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
        database: configService.get<string>('MONGODB_DB_NAME'),
        entities: [User],
      }),
      inject: [ConfigService],
    }),
    //GmailModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    const data = { message: 'Hello API' };
    return data;
  }
}

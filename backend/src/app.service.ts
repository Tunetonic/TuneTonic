import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): any {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      env: process.env.NODE_ENV,
    }
  }
}

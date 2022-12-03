import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'hello'
  }

  @Get('object')
  getObject(): any {
    return { type: 'string', message: 'test object' }
  }
}

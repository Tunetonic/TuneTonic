import { DynamicModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

export const globalConfig: DynamicModule = ConfigModule.forRoot({
  envFilePath: `../.env.development`,
  isGlobal: true,
})

import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return null;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}

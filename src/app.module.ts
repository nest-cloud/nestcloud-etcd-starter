import { Module } from '@nestjs/common';
import { BootModule } from '@nestcloud/boot';
import { ConfigModule } from '@nestcloud/config';
import { ServiceModule } from '@nestcloud/service';
import { LoadbalanceModule } from '@nestcloud/loadbalance';
import { FeignModule } from '@nestcloud/feign';
import { ScheduleModule } from '@nestcloud/schedule';
import { EtcdModule } from '@nestcloud/etcd';
import {
  NEST_BOOT,
  NEST_LOADBALANCE,
  components,
  NEST_ETCD,
} from '@nestcloud/common';
import { TerminusModule } from '@nestjs/terminus';
import { ProxyModule } from '@nestcloud/proxy';

import * as controllers from './controllers';
import * as services from './services';
import * as clients from './clients';
import { LoggerModule } from '@nestcloud/logger';

@Module({
  imports: [
    LoggerModule.register(),
    ScheduleModule.register(),
    BootModule.register(__dirname, `bootstrap-${process.env.NODE_ENV || 'development'}.yml`),
    EtcdModule.register({ dependencies: [NEST_BOOT] }),
    ConfigModule.register({ dependencies: [NEST_BOOT, NEST_ETCD] }),
    ServiceModule.register({ dependencies: [NEST_BOOT, NEST_ETCD] }),
    LoadbalanceModule.register({ dependencies: [NEST_BOOT] }),
    FeignModule.register({ dependencies: [NEST_LOADBALANCE] }),
    ProxyModule.register({ dependencies: [NEST_BOOT] }),
    TerminusModule.forRootAsync({
      inject: [],
      useFactory: () => ({ endpoints: [{ url: '/health', healthIndicators: [] }] }),
    }),
  ],
  controllers: components(controllers),
  providers: components(services, clients),
})
export class AppModule {
}

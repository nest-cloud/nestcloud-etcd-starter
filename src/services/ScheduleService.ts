import { Injectable, Logger } from '@nestjs/common';
import { NestSchedule, Interval } from '@nestcloud/schedule';
import { InjectLogger } from '@nestcloud/logger';
import { BootValue } from '@nestcloud/boot';
import { ConfigValue } from '@nestcloud/config';

@Injectable()
export class ScheduleService extends NestSchedule {
  @BootValue('custom.data', 'default custom data')
  private readonly customData: string;

  // In this project, the consul key is 'nestcloud-starter-service-config'
  // Please insert data in it.
  @ConfigValue('test', 'default custom data')
  private readonly consulCustomData: string;

  public constructor(
    @InjectLogger() private readonly logger: Logger,
  ) {
    super();
  }

  @Interval(2000)
  intervalBootJob() {
    this.logger.log(`interval get custom data from boot: ${this.customData}`);
  }

  @Interval(2000)
  intervalConsulConfigJob() {
    this.logger.log(`interval get custom from consul config: ${this.consulCustomData}`);
  }
}

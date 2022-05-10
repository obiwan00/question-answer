import { Controller, Get } from '@nestjs/common';
import { Message } from '@qa/api-interfaces';
import { AppService } from '@qa/server/app/app.service';


@Controller()
export class AppController {
  public constructor(private readonly appService: AppService) { }

  @Get('hello')
  public getData(): Message {
    return this.appService.getData();
  }
}

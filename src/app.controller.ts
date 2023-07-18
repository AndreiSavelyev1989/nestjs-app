import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Report } from './data';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string): Report[] {
    return this.appService.getAllReports(type);
  }

  @Get(':id')
  getReportById(@Param('id') id: string, @Param('type') type: string) {
    return this.appService.getReportById(id, type);
  }

  @Post()
  createReport(
    @Body() body: { source: string; amount: number },
    @Param('type') type: string,
  ) {
    return this.appService.createReport(body, type);
  }

  @Put(':id')
  updateReportById(
    @Body() body: any,
    @Param('id') id: string,
    @Param('type') type: string,
  ) {
    return this.appService.updateReportById(id, body, type);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReportById(@Param('id') id: string) {
    return this.appService.deleteReportById(id);
  }
}

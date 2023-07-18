import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
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
  createReport() {
    return 'New product was created!';
  }

  @Put(':id')
  updateReportById(@Param() params: any): string {
    return `Product with id: ${params.id} was updated!`;
  }

  @Delete(':id')
  deleteReportById(@Param() params: any): string {
    return `Product with id: ${params.id} was deleted!`;
  }
}

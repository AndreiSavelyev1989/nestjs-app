import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('report/income')
export class AppController {
  // constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  getAllReports() {
    return [];
  }

  @Get(":id")
  getReportById() {
    return {};
  }

  @Post()
  createReport() {
    return "New product was created!";
  }

  @Put(":id")
  updateReportById(@Param() params: any): string {
    return `Product with id: ${params.id} was updated!`
  }

  @Delete(":id")
  deleteReportById(@Param() params: any): string {
    return `Product with id: ${params.id} was deleted!`;
  }
}

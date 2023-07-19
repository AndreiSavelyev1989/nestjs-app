import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Report, ReportType } from './data';
import { CreateReportDto } from './dtos/report.dto';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ): Report[] {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ) {
    return this.appService.getReportById(id, type);
  }

  @Post()
  createReport(
    @Body() body: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.createReport(body, reportType);
  }

  @Put(':id')
  updateReportById(
    @Body() body: { source: string; amount: number },
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.updateReportById(id, body, reportType);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReportById(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReportById(id);
  }
}

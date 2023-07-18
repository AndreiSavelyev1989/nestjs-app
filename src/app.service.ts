import { Injectable } from '@nestjs/common';
import { Report, ReportType, data } from './data';

@Injectable()
export class AppService {
  getAllReports(type: string): Report[] {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const result = data.reports.filter((el) => el.type === reportType);
    return result;
  }

  getReportById(id: string, type: string): Report | string {
    const result = data.reports.find((el) => el.id === id && el.type === type);
    return result ? result : 'Not found';
  }
}

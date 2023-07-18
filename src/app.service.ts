import { Injectable } from '@nestjs/common';
import { Report, ReportType, data } from './data';
import { v4 as uuid } from 'uuid';

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

  createReport(body: any, type: string) {
    try {
      const newReport = {
        id: uuid(),
        created_at: new Date(),
        updated_at: new Date(),
        type:
          type === ReportType.INCOME ? ReportType.INCOME : ReportType.EXPENSE,
        ...body,
      };
      data.reports.push(newReport);
      return newReport;
    } catch (err) {
      return err;
    }
  }

  updateReportById(id: string, body: any, type: string) {
    try {
      const updatedReports = data.reports.map((report) =>
        report.id === id && report.type === type
          ? { ...report, ...body }
          : report,
      )
      data.reports = [...updatedReports];
      const updatedReport = updatedReports.find(report => report.id === id && report.type === type);
      return updatedReport;
    } catch (err) {
      return err;
    }
  }
}

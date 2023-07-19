import { Injectable } from '@nestjs/common';
import { Report, ReportType, data } from './data';
import { v4 as uuid } from 'uuid';

interface CreateReport {
  amount: number;
  source: string
}

interface UpdateReport {
  amount?: number;
  source?: string
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType): Report[] {
    const result = data.reports.filter((el) => el.type === type);
    return result;
  }

  getReportById(id: string, type: ReportType): Report | string {
    const result = data.reports.find((el) => el.id === id && el.type === type);
    return result ? result : 'Not found';
  }

  createReport(body: CreateReport, type: ReportType) {
    try {
      const newReport = {
        id: uuid(),
        created_at: new Date(),
        updated_at: new Date(),
        type,
        ...body,
      };
      data.reports.push(newReport);
      return newReport;
    } catch (err) {
      return err;
    }
  }

  updateReportById(
    id: string,
    body: UpdateReport,
    type: ReportType,
  ) {
    try {
      const updatedReports = data.reports.map((report) =>
        report.id === id && report.type === type
          ? { ...report, ...body, updated_at: new Date() }
          : report,
      );
      data.reports = [...updatedReports];
      const updatedReport = updatedReports.find(
        (report) => report.id === id && report.type === type,
      );

      if (!updatedReport) {
        throw new Error(`The report with id: ${id} doesn't exist`);
      }
      return updatedReport;
    } catch (err) {
      return err.message;
    }
  }

  deleteReportById(id: string) {
    try {
      const reportForDelete = data.reports.find((report) => report.id === id);
      if (!reportForDelete) {
        throw new Error(
          `Can't to delete the report. Report with id:${id} doesn't exist`,
        );
      }
      data.reports = data.reports.filter((report) => report.id !== id);
      return;
    } catch (err) {
      return err.message;
    }
  }
}

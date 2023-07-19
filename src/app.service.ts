import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from './dtos/report.dto';

interface CreateReport {
  amount: number;
  source: string;
}

interface UpdateReport {
  amount?: number;
  source?: string;
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    try {
      return data.reports
        .filter((el) => el.type === type)
        .map((report) => new ReportResponseDto(report));
    } catch (err) {
      return err.message;
    }
  }

  getReportById(id: string, type: ReportType): ReportResponseDto {
    try {
      const report = data.reports.find(
        (el) => el.id === id && el.type === type,
      );
      if (!report) {
        throw new Error(`Report with id: ${id} not found`);
      }
      return new ReportResponseDto(report);
    } catch (err) {
      return err.message;
    }
  }

  createReport(body: CreateReport, type: ReportType): ReportResponseDto {
    try {
      const newReport = {
        id: uuid(),
        created_at: new Date(),
        updated_at: new Date(),
        type,
        ...body,
      };
      data.reports.push(newReport);
      return new ReportResponseDto(newReport);
    } catch (err) {
      return err;
    }
  }

  updateReportById(
    id: string,
    body: UpdateReport,
    type: ReportType,
  ): ReportResponseDto {
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
      return new ReportResponseDto(updatedReport);
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

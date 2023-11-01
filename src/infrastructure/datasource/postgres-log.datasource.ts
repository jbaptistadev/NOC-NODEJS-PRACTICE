import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

const primaClient = new PrismaClient();

const severityEmun = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    try {
      const level = severityEmun[log.level];
      const newLog = await primaClient.logModel.create({
        data: {
          ...log,
          level,
        },
      });

      console.log('log saved', newLog);
    } catch (error) {
      console.log('error saving log on postgres', error);
    }
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEmun[severityLevel];

    const dbLogs = await primaClient.logModel.findMany({
      where: {
        level,
      },
    });

    return dbLogs.map((dbLog) => LogEntity.fromObject(dbLog));
  }
}

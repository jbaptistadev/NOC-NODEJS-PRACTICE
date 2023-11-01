import { envs } from '../config/plugins/envs.plugin';

import { CheckService } from '../domain/use-cases/checks/check-service';
import { CheckServiceMutiple } from '../domain/use-cases/checks/check-service-multiple';
// import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasource/file-system.datasource';
import { MongoLogDataSource } from '../infrastructure/datasource/mongo-log.datasource';
import { PostgresLogDataSource } from '../infrastructure/datasource/postgres-log.datasource';
import { LogRepositoryImplementation } from '../infrastructure/repositories/log-repository.implementation';
import { CronService } from './cron/cron-service';
// import { EmailService } from './email/email.service';

const fsLogRepository = new LogRepositoryImplementation(
  new FileSystemDatasource()
);
const pstgresLogRepository = new LogRepositoryImplementation(
  new PostgresLogDataSource()
);
const mongoLogRepository = new LogRepositoryImplementation(
  new MongoLogDataSource()
);

// const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log('Server Started...', envs.PORT);
    // new SendEmailLogs(emailService, FileSystemLogRepository).execute(
    //   'jbaptista.dev@gmail.com'
    // );

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://goosdsdgle.com';
      new CheckService(
        pstgresLogRepository,
        () => console.log(`Success on check service ${url}`),
        (error) => console.log(error)
      ).execute(url);
      // new CheckServiceMutiple(
      //   [fsLogRepository, pstgresLogRepository, mongoLogRepository],
      //   () => console.log(`Success on check service ${url}`),
      //   (error) => console.log(error)
      // ).execute(url);
    });
  }
}

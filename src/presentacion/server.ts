import { envs } from '../config/envs.plugin';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasource/file-system.datasoruce';
import { LogRepositoryImplementation } from '../infrastructure/repositories/log-repository.implementation';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const FileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDatasource()
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log('Server Started...', envs.PORT);
    // new SendEmailLogs(emailService, FileSystemLogRepository).execute(
    //   'jbaptista.dev@gmail.com'
    // );

    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'http://localhost:3000';

    //   // new CheckService().execute('https://google.com');
    //   new CheckService(
    //     FileSystemLogRepository,
    //     () => console.log(`Success on check service ${url}`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}

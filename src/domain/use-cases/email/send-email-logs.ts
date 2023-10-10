import { EmailService } from '../../../presentacion/email/email.service';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface SendEmailUseCase {
  execute(to: string | string[]): Promise<boolean>;
}

export class SendEmailLogs implements SendEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}
  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);

      if (!sent) {
        throw new Error('Email log not sent');
      }

      const log = new LogEntity({
        message: `${to}`,
        level: LogSeverityLevel.low,
        origin: 'send-email-logs',
      });

      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.high,
        origin: 'send-email-logs',
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}

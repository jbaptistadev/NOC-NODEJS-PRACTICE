import nodemailer from 'nodemailer';
import { envs } from '../../config/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, html, attachments } = options;

    try {
      await this.transporter.sendMail({
        from: envs.MAILER_EMAIL,
        to,
        subject,
        html,
        attachments,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {
    const subject = 'System NOC Logs';
    const html = '<h1>system noc logs</h1>';

    const attachments: Attachment[] = [
      {
        filename: 'logs-low.log',
        path: './logs/logs-low.log',
      },
      {
        filename: 'logs-medium.log',
        path: './logs/logs-medium.log',
      },
      {
        filename: 'logs-high.log',
        path: './logs/logs-high.log',
      },
    ];

    return this.sendEmail({
      to,
      subject,
      html,
      attachments,
    });
  }
}

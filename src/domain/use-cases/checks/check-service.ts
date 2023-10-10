import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private logRepository: LogRepository,
    private sucessCallback: SuccessCallback,
    private errorCallback: ErrorCallback
  ) {
    if (!logRepository) {
      throw new Error('LogRepository is required');
    }
  }

  async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      const log = new LogEntity({
        message: `Success on check service ${url}`,
        level: LogSeverityLevel.low,
        origin: 'check-service',
      });
      await this.logRepository.saveLog(log);
      this.sucessCallback && this.sucessCallback();

      return true;
    } catch (error) {
      const errorMessage = `Error on check service ${url}`;
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: 'check-service',
      });
      await this.logRepository.saveLog(log);
      this.errorCallback && this.errorCallback(errorMessage);

      return false;
    }
  }
}

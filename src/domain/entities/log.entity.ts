export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface LogOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public origin: string;
  public createAt: Date;

  constructor(options: LogOptions) {
    const { level, message, origin } = options;
    this.level = level;
    this.message = message;
    this.origin = origin;
    this.createAt = new Date();
  }

  static fromJson = (json: string): LogEntity => {
    const { level, message, createAt, origin } = JSON.parse(json);

    json = json === '' ? '{}' : json;

    if (!level) throw new Error('Level is required');
    if (!message) throw new Error('Message is required');
    if (!createAt) throw new Error('CreateAt is required');
    if (!origin) throw new Error('origin is required');

    const log = new LogEntity({
      level,
      message,
      origin,
      createAt,
    });

    return log;
  };

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { level, message, createAt, origin } = object;
    const log = new LogEntity({
      level,
      message,
      origin,
      createAt,
    });

    return log;
  };
}

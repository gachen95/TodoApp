import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'path';

@Injectable()
export class ConfigService {
  constructor() {
    dotenv.config({
      path: path.resolve(process.cwd(), 'config/', process.env.NODE_ENV ? `${process.env.NODE_ENV}.env` : 'development.env'),
    });
  }

  getNumber(key: string): number | undefined {
    return +process.env[key] as number | undefined;
  }

  getBoolean(key: string): boolean {
    return process.env[key] === 'true';
  }

  getString(key: string): string | undefined {
    return process.env[key];
  }
}
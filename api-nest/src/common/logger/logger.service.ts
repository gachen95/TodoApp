// https://github.com/nestjs/nest/issues/507

import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { DateTime } from 'luxon';
import * as DailyRotateFile from "winston-daily-rotate-file";
import * as fs from 'fs';
import * as path from 'path';

const env = process.env.NODE_ENV || 'development';

const logDir = 'log';
const excptionDir = 'exception';

const dailyRotateFileTransport = new DailyRotateFile({
    dirname: `${logDir}`,
    filename: 'API-%DATE%.log', 
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d'
  });

  const dailyExceptionRotateFileTransport = new DailyRotateFile({
    dirname: `${excptionDir}`,
    filename: 'ex-%DATE%.log', 
    datePattern: 'YYYY-MM',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '12m'
  });


@Injectable()
export class MyLogger implements LoggerService {
    private winston

    constructor() {
        this.winston = winston.createLogger({
            // change level if in dev environment versus production
            level: env === 'production' ? 'info' : 'debug',
            // exitOnError: false,

            format: winston.format.combine(  
                winston.format.prettyPrint(),
                winston.format.splat(),   
                winston.format.simple(),           
                winston.format.timestamp({
                  format: 'YYYY-MM-DD HH:mm:ss'
                }),
                //winston.format.printf(options => `${options.timestamp} [${options.level.toUpperCase()}] ${options.label} - ${options.message}`)
                winston.format.printf(info => `${info.timestamp} [${info.level}] : ${info.message}`)
              ),
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.timestamp({
                          format: 'YYYY-MM-DD HH:mm:ss'
                        }),
                        //winston.format.printf(options => `${options.timestamp} [${options.level.toUpperCase()}] ${options.label} - ${options.message}`)
                        winston.format.printf(info => `${info.timestamp} [${info.level}] : ${info.message}`)
                      ),
                }),
               dailyRotateFileTransport
            ],            
            exceptionHandlers: [
                //new winston.transports.File({ filename: `${logDir}/exceptions.log`})
                dailyExceptionRotateFileTransport
            ]
        });

        // change the color of log data in winston on console
        winston.addColors({
            error: 'red',
            warn: 'yellow',
            info: 'cyan',
            debug: 'green'
        });
    }

    error(message: string, ...meta: any[]) {
        this.winston.error(message, meta);
    }

    log(message: string, ...meta: any[]) {
        this.winston.log(message, meta);
    }

    warn(message: string, ...meta: any[]) {
        this.winston.warn(message, meta);
    }

    info(message: string, ...meta: any[]) {
        this.winston.info(message, meta);
    }

    debug(message: string, ...meta: any[]) {
        this.winston.debug(message, meta);
    }
}

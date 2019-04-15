import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import { MyLogger }  from './common/logger/logger.service';
import { AppModule } from './app.module';

async function bootstrap() {

  const appOptions = { logger: false };
  const app = await NestFactory.create(AppModule, appOptions);
  app.useLogger(app.get(MyLogger));

  //const app = await NestFactory.create(AppModule);

  // security
  app.enableCors();
  app.use(helmet());
  // TODO:
  // csurf caused
  // {"statusCode":500,"message":"Internal server error"}
  ////////////////////////////////////////// app.use(csurf());

  // http://www.codershood.info/2018/06/16/creating-api-rate-limiter-in-nodejs-using-express-and-redis/
  // app.use(
  //   rateLimit({
  //     windowMs: 60 * 60 * 1000, // 1 hour
  //     max: 100, // limit each IP to 100 requests per windowMs
  //   }),
  // );

  await app.listen(process.env.PORT && !isNaN(+process.env.PORT) ? +process.env.PORT : 4000);

  app.get(MyLogger).info("NODE_ENV is " + process.env.NODE_ENV + " ..........");
  app.get(MyLogger).info("Listening on port " + process.env.PORT  + " ..........");

}
bootstrap();

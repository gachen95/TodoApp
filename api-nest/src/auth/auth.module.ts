import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';
import { ConfigModule } from '../common/config/config.module';
import { ConfigService } from '../common/config/config.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: process.env.JWT_SECRET_KEY || configService.getString('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES_IN || configService.getString('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    AuthResolver,
    JwtStrategy,
    GoogleStrategy
  ]
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RouterModule } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtRefreshTokenStrategy } from './jwt/jwt-refresh.stertegy';
import { ProjectsModule } from 'src/projects/projects.module';
import { ProjectsService } from 'src/projects/projects.service';

@Module({
  imports: [
    PassportModule,
    AuthModule,
    ProjectsModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: `${configService.get(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          )}s`,
        },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UsersService,
    ConfigService,
    JwtRefreshTokenStrategy,
    ProjectsService,
  ],
})
export class AuthModule {}

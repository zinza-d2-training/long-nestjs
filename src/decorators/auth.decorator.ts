import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/modules/auth/guards/jwt.guard';
import { TokenGuard } from 'src/modules/auth/guards/token.guard';

export const Auth = () => applyDecorators(UseGuards(JwtGuard, TokenGuard));

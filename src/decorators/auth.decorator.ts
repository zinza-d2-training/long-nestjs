import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { EnumRoles } from 'src/interfaces/roles';
import { Roles } from './role.decorator';

export const Auth = (role: EnumRoles) =>
  applyDecorators(UseGuards(JwtGuard, RolesGuard), Roles(role));

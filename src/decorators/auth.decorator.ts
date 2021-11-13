import { applyDecorators, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guard';
import { EnumRoles } from 'src/interfaces/roles';
import { JwtGuard } from 'src/modules/auth/guards/jwt.guard';
import { Roles } from './role.decorator';

export const Auth = (role: EnumRoles) =>
  applyDecorators(UseGuards(JwtGuard, RolesGuard), Roles(role));

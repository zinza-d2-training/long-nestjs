import { SetMetadata } from '@nestjs/common';
import { ROLES } from 'src/constants/roles';
import { EnumRoles } from 'src/interfaces/roles';

export const Roles = (role: EnumRoles) => SetMetadata(ROLES, role);

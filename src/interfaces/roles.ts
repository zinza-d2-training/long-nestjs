export enum EnumRoles {
  NORMAL_USER,
  ADMIN,
}

export interface IRole {
  id: 0 | 1;
  name: EnumRoles;
}

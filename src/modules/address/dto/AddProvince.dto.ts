import { IsNotEmpty, IsString } from 'class-validator';

export class AddProvinceDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  provinceName: string;
}

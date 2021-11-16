import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddProvinceDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

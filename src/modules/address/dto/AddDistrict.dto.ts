import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddDistrictDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  provinceId: number;
}

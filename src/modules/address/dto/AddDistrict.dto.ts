import { IsNotEmpty, IsString } from 'class-validator';

export class AddDistrictDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  districtName: string;

  @IsString()
  @IsNotEmpty()
  provinceId: string;
}

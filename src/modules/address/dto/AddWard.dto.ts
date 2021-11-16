import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddWardDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  districtId: number;
}

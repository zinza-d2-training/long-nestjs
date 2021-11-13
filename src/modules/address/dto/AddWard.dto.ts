import { IsNotEmpty, IsString } from 'class-validator';

export class AddWardDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  wardName: string;

  @IsString()
  @IsNotEmpty()
  districtId: string;
}

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVaccineDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  fromAge: number;

  @IsNumber()
  @IsOptional()
  toAge: number;

  @IsNumber()
  @IsOptional()
  shortDistant: number;

  @IsNumber()
  @IsOptional()
  fullyVaccinated: number;
}

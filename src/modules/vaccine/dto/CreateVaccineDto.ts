import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVaccineDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  fromAge: number;

  @IsNumber()
  @IsNotEmpty()
  toAge: number;

  @IsNumber()
  @IsNotEmpty()
  shortDistant: number;

  @IsNumber()
  @IsNotEmpty()
  fullyVaccinated: number;
}

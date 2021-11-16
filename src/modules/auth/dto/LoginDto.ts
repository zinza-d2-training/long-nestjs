import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  citizenId: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  readonly usertName: string;

  @IsString()
  @IsNotEmpty()
  readonly Password: string;

  @IsNotEmpty()
  @IsString()
  readonly Salt: string;

  @IsString()
  readonly RefreshTokken: boolean;
}

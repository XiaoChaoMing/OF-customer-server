/* eslint-disable prettier/prettier */

import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  readonly Avatar: string;

  @IsDateString()
  readonly birthDay: string;

  @IsBoolean()
  readonly Sexual: boolean;

  @IsNumber()
  @IsNotEmpty()
  readonly accountId: number;
}

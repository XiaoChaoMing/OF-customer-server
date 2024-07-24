/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsNumber } from 'class-validator';

export class FollowerDto {
  @IsNumber()
  @IsNotEmpty()
  folowerId: number;

  @IsNumber()
  @IsNotEmpty()
  followingId: number;
}

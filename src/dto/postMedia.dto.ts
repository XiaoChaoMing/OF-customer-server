/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class postMediaDto {
  @IsString()
  readonly mediaItem: string;

  @IsString()
  @IsNotEmpty()
  readonly PostId: number;
}

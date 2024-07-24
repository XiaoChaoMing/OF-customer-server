/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class GroupDto {
  @IsBoolean()
  readonly isLock: boolean;

  @IsString()
  @IsNotEmpty()
  readonly groupName: string;

  @IsString()
  @IsNotEmpty()
  readonly Description: string;

  @IsString()
  @IsNotEmpty()
  readonly groupImage: string;

  @IsString()
  @IsNotEmpty()
  readonly groupWall: number;
}

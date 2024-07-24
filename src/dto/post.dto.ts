/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class postDto {
  @IsString()
  readonly Status: string;

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly postTypeId: number;

  @IsNumber()
  readonly groupId: number;

  @IsNumber()
  readonly pageId: number;

  readonly mediaFile: string[];
}

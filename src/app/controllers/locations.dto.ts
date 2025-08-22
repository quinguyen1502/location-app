import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ description: 'The unique key of the location' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  key: string;

  @ApiProperty({ description: 'The name of the location' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'The area of the location' })
  @IsInt()
  @IsOptional()
  area: number;

  @ApiProperty({ description: 'The ID of the parent location' })
  @IsInt()
  @IsOptional()
  parentId: number;
}

export class UpdateLocationDto {
  @ApiProperty({ description: 'The name of the location' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'The area of the location' })
  @IsInt()
  @IsOptional()
  area: number;
}

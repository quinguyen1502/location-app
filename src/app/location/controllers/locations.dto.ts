import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ description: 'The unique key of the location', default: 'A' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  key: string;

  @ApiProperty({
    description: 'The name of the location',
    default: 'Building A',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'The area of the location', default: 100.5 })
  @IsNumber()
  @IsOptional()
  area: number;

  @ApiProperty({ description: 'The ID of the parent location', default: 1 })
  @IsInt()
  @IsOptional()
  parentId: number;
}

export class UpdateLocationDto {
  @ApiProperty({
    description: 'The name of the location',
    default: 'Building A',
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'The area of the location', default: 100.5 })
  @IsNumber()
  @IsOptional()
  area: number;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  TreeChildren,
  TreeParent,
  Tree,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
@Tree('materialized-path')
export class Location {
  @ApiProperty({
    description: 'The unique identifier of the location',
    default: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The unique number of the location',
    default: 'A',
  })
  @Column()
  @Index({ unique: true })
  number: string;

  @ApiProperty({
    description: 'The name of the location',
    default: 'Building A',
  })
  @Column()
  name: string;

  @ApiProperty({ description: 'The area of the location', default: 100.5 })
  @Column({ type: 'float', nullable: true })
  area: number;

  @ApiProperty({ description: 'The parent location', type: Object })
  @TreeParent({ onDelete: 'CASCADE' })
  parent: Location;

  @ApiProperty({
    description: 'The child locations',
    type: Object,
    isArray: true,
  })
  @TreeChildren({ cascade: true })
  children: Location[];

  @ApiProperty({ description: 'The creation date of the location' })
  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @ApiProperty({ description: 'The updated date of the location' })
  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}

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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  number: string;

  @Column()
  name: string;

  @Column({ type: 'float', nullable: true })
  area: number;

  @TreeParent({ onDelete: 'CASCADE' })
  parent: Location;

  @TreeChildren({ cascade: true })
  children: Location[];

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}

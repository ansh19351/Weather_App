import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('City')
export class City 
{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}
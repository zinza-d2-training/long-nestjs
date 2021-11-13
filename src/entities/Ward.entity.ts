import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { District } from './District.entity';

@Entity()
export class Ward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wardName: string;

  @ManyToOne(() => District, (district) => district.wards)
  district: District;
}

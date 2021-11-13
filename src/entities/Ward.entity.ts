import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { District } from './District.entity';

@Entity('wards')
export class Ward {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'ward_name', type: 'varchar' })
  wardName: string;

  @Column({ name: 'district_id', type: 'varchar' })
  districtId: string;

  @ManyToOne(() => District, (district) => district.wards)
  @JoinColumn({ name: 'district_id' })
  district: District;
}

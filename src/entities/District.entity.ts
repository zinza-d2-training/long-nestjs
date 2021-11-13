import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Province } from './Province.entity';
import { Ward } from './Ward.entity';

@Entity('districts')
export class District {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'district_name', type: 'varchar' })
  districtName: string;

  @Column({ name: 'province_id', type: 'varchar' })
  provinceId: string;

  @ManyToOne(() => Province, (province) => province.districts)
  @JoinColumn({ name: 'province_id' })
  province: Province;

  @OneToMany(() => Ward, (ward) => ward.district)
  wards: Ward[];
}

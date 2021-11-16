import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { Province } from './Province.entity';
import { Ward } from './Ward.entity';

@Entity('districts')
export class District {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'province_id', type: 'varchar' })
  provinceId: number;

  @Column({ name: 'created_at', type: 'datetime' })
  createdAt: string;

  @Column({ name: 'updated_at', type: 'datetime' })
  updatedAt: string;

  @ManyToOne(() => Province, (province) => province.districts)
  @JoinColumn({ name: 'province_id' })
  province: Province;

  @OneToMany(() => Ward, (ward) => ward.district)
  wards: Ward[];
}

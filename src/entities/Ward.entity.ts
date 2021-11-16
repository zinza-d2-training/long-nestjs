import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { District } from './District.entity';

@Entity('wards')
export class Ward {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'district_id', type: 'varchar' })
  districtId: number;

  @ManyToOne(() => District, (district) => district.wards)
  @JoinColumn({ name: 'district_id' })
  district: District;

  @Column({ name: 'created_at', type: 'datetime' })
  createdAt: string;

  @Column({ name: 'updated_at', type: 'datetime' })
  updatedAt: string;
}

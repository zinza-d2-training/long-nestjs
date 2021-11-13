import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { District } from './District.entity';

@Entity()
export class Province {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'province_name', type: 'varchar' })
  provinceName: string;

  @OneToMany(() => District, (district) => district.province)
  districts: District[];
}

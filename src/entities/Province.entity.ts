import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { District } from './District.entity';

@Entity('provinces')
export class Province {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @OneToMany(() => District, (district) => district.province)
  districts: District[];
}

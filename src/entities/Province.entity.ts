import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { District } from './District.entity';

@Entity('provinces')
export class Province {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'created_at', type: 'datetime' })
  createdAt: string;

  @Column({ name: 'updated_at', type: 'datetime' })
  updatedAt: string;

  @OneToMany(() => District, (district) => district.province)
  districts: District[];
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { District } from './District.entity';

@Entity('provinces')
export class Province {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @OneToMany(() => District, (district) => district.province)
  districts: District[];
}

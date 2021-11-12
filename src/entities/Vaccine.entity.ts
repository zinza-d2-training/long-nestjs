import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VaccineUser } from './VaccineUser.entity';

@Entity()
export class Vaccine {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: string;

  @Column({ name: 'name', type: 'nvarchar' })
  name: string;

  @Column({ name: 'from_age', type: 'int' })
  fromAge: number;

  @Column({ name: 'to_age', type: 'int' })
  toAge: number;

  @Column({ name: 'short_distance', type: 'int' })
  shortDistant: number;

  @Column({ name: 'fully_vaccinated', type: 'int' })
  fullyVaccinated: number;

  @OneToMany(() => VaccineUser, (vaccineUser) => vaccineUser.id)
  vaccineUser: VaccineUser[];
}

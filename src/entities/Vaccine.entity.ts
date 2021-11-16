import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ name: 'created_at', type: 'datetime' })
  createdAt: string;

  @Column({ name: 'updated_at', type: 'datetime' })
  updatedAt: string;
}

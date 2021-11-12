import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VaccineUser } from './VaccineUser.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: string;

  @Column({ name: 'first_name', type: 'nvarchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'nvarchar' })
  lastName: string;

  @Column({ name: 'phone_number', type: 'varchar' })
  phoneNumber: string;

  @Column({ unique: true, name: 'citizen_id', type: 'varchar' })
  citizenId: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'role', type: 'int', default: 0 })
  role: number;

  @OneToMany(() => VaccineUser, (vaccineUser) => vaccineUser.id)
  vaccineUser: VaccineUser[];
}

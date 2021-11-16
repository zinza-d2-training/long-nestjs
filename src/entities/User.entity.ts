import { EnumRoles } from 'src/interfaces/roles';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

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

  @Column({ name: 'role', type: 'int', default: EnumRoles.NORMAL_USER })
  role: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}

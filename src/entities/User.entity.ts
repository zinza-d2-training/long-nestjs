import { EnumRoles } from 'src/interfaces/roles';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Ward } from './Ward.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'citizen_id', type: 'varchar', unique: true })
  citizenId: string;

  @Column({ name: 'full_name', type: 'varchar' })
  fullName: string;

  @Column({ name: 'gender', type: 'int' })
  gender: number;

  @Column({ name: 'phone_number', type: 'varchar' })
  phoneNumber: string;

  @Column({ name: 'dob', type: 'timestamp' })
  dob: Date;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'ward_id', type: 'int' })
  wardId: number;

  @Column({ name: 'role', type: 'int', default: EnumRoles.NORMAL_USER })
  role: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Ward)
  @JoinColumn({ name: 'ward_id' })
  ward: Ward;
}

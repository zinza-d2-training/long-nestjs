import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ name: 'role', type: 'int', default: 1 })
  role: number;

  @Column({ name: 'created_at', type: 'datetime' })
  createdAt: string;

  @Column({ name: 'updated_at', type: 'datetime' })
  updatedAt: string;
}

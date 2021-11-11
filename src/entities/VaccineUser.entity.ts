import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';
import { Vaccine } from './Vaccine.entity';

@Entity()
export class VaccineUser {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ name: 'date', type: 'date' })
  date: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Vaccine, (vaccine) => vaccine.id)
  @JoinColumn({ name: 'vaccine_id' })
  vaccine: Vaccine;
}

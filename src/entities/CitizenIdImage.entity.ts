import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '.';
import { Image } from './Image.entity';

@Entity('citizen_id_images')
export class CitizenIdImage {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @ManyToOne(() => User, (user) => user.citizenImages)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Image, (image) => image.citizenImage)
  images: Image[];
}

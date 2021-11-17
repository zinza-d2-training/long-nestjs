import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '.';
import { CitizenIdImage } from './CitizenIdImage.entity';
import { File } from './File.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'file_id', type: 'int', unique: true })
  fileId: number;

  @Column({ name: 'citizen_image_id', type: 'int' })
  citizenImageId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => File, (file) => file.image)
  @JoinColumn({ name: 'file_id' })
  file: File;

  @ManyToMany(() => User)
  users: User[];

  @ManyToOne(() => CitizenIdImage, (citizenIdImage) => citizenIdImage.images)
  @JoinColumn({ name: 'citizen_image_id' })
  citizenImage: CitizenIdImage;
}

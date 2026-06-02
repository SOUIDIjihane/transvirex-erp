import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  DISPATCHER = 'dispatcher',
  CHAUFFEUR = 'chauffeur',
  FACTURATION = 'facturation',
  DIRECTION = 'direction',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  nom!: string;

  @Column()
  prenom!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CHAUFFEUR })
  role!: UserRole;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}
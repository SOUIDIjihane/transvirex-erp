import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

export enum MissionStatus {
  EN_ATTENTE = 'en_attente',
  EN_COURS = 'en_cours',
  TERMINEE = 'terminee',
  ANNULEE = 'annulee',
}

@Entity('missions')
export class Mission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titre!: string;

  @Column({ nullable: true })
  description!: string;

  @Column()
  adresseDepart!: string;

  @Column()
  adresseArrivee!: string;

  @Column({ type: 'enum', enum: MissionStatus, default: MissionStatus.EN_ATTENTE })
  status!: MissionStatus;

  @Column({ nullable: true })
  dateDepart!: Date;

  @Column({ nullable: true })
  dateLivraison!: Date;

  @ManyToOne(() => User, { nullable: true, eager: true })
  chauffeur!: User;

  @CreateDateColumn()
  createdAt!: Date;
}
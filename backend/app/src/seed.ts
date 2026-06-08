import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Mission } from './missions/mission.entity';
import { User, UserRole } from './users/user.entity';
import * as bcrypt from 'bcrypt';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userRepo = app.get(getRepositoryToken(User));
  const missionRepo = app.get(getRepositoryToken(Mission));

await missionRepo.query('DELETE FROM missions');
await userRepo.query('DELETE FROM users');

  console.log('Seeding users...');

  const users = [
    { email: 'admin@transvirex.com', password: 'admin123', nom: 'Admin', prenom: 'Super', role: UserRole.ADMIN },
    { email: 'dispatcher@transvirex.com', password: 'dispatch123', nom: 'Martin', prenom: 'Lucas', role: UserRole.DISPATCHER },
    { email: 'facturation@transvirex.com', password: 'fact123', nom: 'Durand', prenom: 'Paul', role: UserRole.FACTURATION },
    { email: 'direction@transvirex.com', password: 'direction123', nom: 'Dupont', prenom: 'Marie', role: UserRole.DIRECTION },
    { email: 'm.dubois@transvirex.com', password: 'chauf123', nom: 'Dubois', prenom: 'Marc', role: UserRole.CHAUFFEUR },
    { email: 's.martin@transvirex.com', password: 'chauf123', nom: 'Martin', prenom: 'Sophie', role: UserRole.CHAUFFEUR },
    { email: 'p.leroy@transvirex.com', password: 'chauf123', nom: 'Leroy', prenom: 'Pierre', role: UserRole.CHAUFFEUR },
    { email: 'j.bernard@transvirex.com', password: 'chauf123', nom: 'Bernard', prenom: 'Julie', role: UserRole.CHAUFFEUR },
    { email: 't.petit@transvirex.com', password: 'chauf123', nom: 'Petit', prenom: 'Thomas', role: UserRole.CHAUFFEUR },
  ];

  for (const u of users) {
    const hashed = await bcrypt.hash(u.password, 10);
    const user = userRepo.create({ ...u, password: hashed });
    await userRepo.save(user);
  }

  console.log('Seeding missions...');

  const missions = [
    { titre: 'EcomExpress - Paris 11ème', adresseDepart: '15 Rue du Commerce, Paris', adresseArrivee: '89 Rue Client, Paris 75011', status: 'terminee' },
    { titre: 'FreshFood - Lyon 3ème', adresseDepart: '42 Avenue des Halles, Lyon', adresseArrivee: '156 Boulevard Destinataire, Lyon 69003', status: 'terminee' },
    { titre: 'FashionHub - Paris 17ème (Urgent)', adresseDepart: '67 Rue de la Mode, Paris', adresseArrivee: '234 Rue Livraison, Paris 75017', status: 'en_cours' },
    { titre: 'TechParts - Toulouse (Fret)', adresseDepart: '8 Boulevard Industriel, Toulouse', adresseArrivee: '45 Avenue Client, Toulouse 31100', status: 'en_cours' },
    { titre: 'MediSupply - Marseille (Urgent)', adresseDepart: '23 Rue de la Santé, Marseille', adresseArrivee: '78 Chemin Hôpital, Marseille 13008', status: 'terminee' },
    { titre: 'EcomExpress - Boulogne', adresseDepart: '15 Rue du Commerce, Paris', adresseArrivee: '123 Rue Destinataire, Boulogne 92100', status: 'en_attente' },
    { titre: 'AutoPièces - Bordeaux', adresseDepart: '91 Zone Industrielle, Bordeaux', adresseArrivee: '67 Rue Garage, Bordeaux 33200', status: 'en_cours' },
    { titre: 'UrbanMarket - Lyon 5ème', adresseDepart: '33 Place du Marché, Lyon', adresseArrivee: '89 Avenue Commerce, Lyon 69005', status: 'terminee' },
    { titre: 'BioFarm - Lille (Fret)', adresseDepart: '5 Chemin Rural, Lille', adresseArrivee: '234 Ferme Bio, Lille 59200', status: 'en_cours' },
    { titre: 'ProOffice - Paris 13ème', adresseDepart: '18 Rue Professionnelle, Paris', adresseArrivee: '456 Bureau Client, Paris 75013', status: 'en_attente' },
    { titre: 'PharmaCare - Toulouse (Urgent)', adresseDepart: '7 Avenue Médicale, Toulouse', adresseArrivee: '90 Rue Pharmacie, Toulouse 31300', status: 'terminee' },
    { titre: 'EcomExpress - Paris 19ème', adresseDepart: '15 Rue du Commerce, Paris', adresseArrivee: '678 Avenue Résidentielle, Paris 75019', status: 'en_cours' },
    { titre: 'FreshFood - Lyon Centre', adresseDepart: '42 Avenue des Halles, Lyon', adresseArrivee: '12 Place Centre, Lyon 69001', status: 'en_attente' },
    { titre: 'FashionHub - Paris 9ème', adresseDepart: '67 Rue de la Mode, Paris', adresseArrivee: '345 Boulevard Mode, Paris 75009', status: 'annulee' },
    { titre: 'MediSupply - Marseille Clinique', adresseDepart: '23 Rue de la Santé, Marseille', adresseArrivee: '567 Chemin Clinique, Marseille 13010', status: 'terminee' },
  ];

  for (const m of missions) {
    const mission = missionRepo.create(m as any);
    await missionRepo.save(mission);
  }

  console.log('Seed terminé !');
  await app.close();
}

seed().catch(console.error);
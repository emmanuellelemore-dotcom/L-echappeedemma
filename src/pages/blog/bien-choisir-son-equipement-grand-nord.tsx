import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function BienChoisirSonEquipementGrandNord() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef7fb] via-white to-[#eef7fb]">
      <Navbar />
      <section className="w-full pt-28 pb-12 px-4 bg-secondary/60 border-b border-border text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
          L'échappée d'Emma - Bien choisir son équipement pour le Grand Nord
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Le Grand Nord ne se dompte pas, il s'apprivoise. L'équipement n'est pas qu'une question de confort ; c'est votre allié de sécurité.
        </p>
      </section>

      <main className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-accent mb-6">La règle d'or : la modularité (3 couches)</h2>
        <p className="text-foreground mb-6">
          Oubliez les gros manteaux uniques. La technique des trois couches permet d'ajuster votre température en temps réel :
          couche respirante, couche isolante (souvent en laine mérinos), puis couche protectrice coupe-vent et imperméable.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Grand froid : ne craignez plus les températures extrêmes</h2>
        <ul className="list-disc ml-6 space-y-2 text-foreground">
          <li>Prévoyez deux paires de gants, deux bonnets et plusieurs paires de chaussettes en laine.</li>
          <li>En excursion grand froid, les prestataires prêtent souvent combinaison thermique et bottes adaptées.</li>
          <li>Ajoutez 10 minutes de préparation avant chaque sortie pour vous habiller sans stress.</li>
        </ul>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Les indispensables oubliés</h2>
        <ul className="list-disc ml-6 space-y-2 text-foreground">
          <li>Les bâtons de randonnée : un vrai plus sécurité, même pour les sportifs.</li>
          <li>La marge de dégivrage en voiture : prévoyez toujours 20 minutes supplémentaires.</li>
          <li>Une tenue de rechange sèche pour rester confortable toute la journée.</li>
        </ul>

        <div className="mt-12 rounded-2xl border border-accent/25 bg-accent/5 p-6 text-center">
          <p className="text-foreground font-medium">
            Vous n'avez pas à deviner ce dont vous avez besoin.
          </p>
          <p className="mt-2 text-muted-foreground">
            Mon rôle est de vous apporter la clarté nécessaire pour aborder votre départ avec sérénité.
          </p>
          <Link to="/devis" className="mt-4 inline-flex rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground hover:opacity-90">
            Débuter mon échappée
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

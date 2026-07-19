import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function PourquoiChoisirLaLaponieParentheseHivernale() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef7fb] via-white to-[#eef7fb]">
      <Navbar />
      <section className="w-full pt-28 pb-12 px-4 bg-secondary/60 border-b border-border text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
          L'échappée d'Emma - Pourquoi choisir la Laponie pour votre prochaine parenthèse hivernale ?
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          La Laponie, ce n'est pas qu'une destination : c'est un état d'esprit, une invitation à ralentir et à respirer.
        </p>
      </section>

      <main className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-accent mb-6">Chasser les aurores : patience et connexion</h2>
        <ul className="list-disc ml-6 space-y-2 text-foreground">
          <li>Privilégiez les zones isolées, loin de la pollution lumineuse.</li>
          <li>Voyagez entre novembre et mars pour les longues nuits.</li>
          <li>Utilisez les applications de suivi d'activité solaire.</li>
          <li>Laissez-vous le temps : l'attente fait partie de la magie.</li>
        </ul>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Un itinéraire, deux mondes</h2>
        <p className="text-foreground mb-6">
          En Laponie, il n'existe pas d'itinéraire parfait pour tout le monde. Il existe le vôtre :
          celui qui répond à votre besoin de calme, de nature et de rythme juste.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Équipement indispensable</h2>
        <ul className="list-disc ml-6 space-y-2 text-foreground">
          <li>Vêtements techniques en 3 couches, gants, bonnet, chaussettes laine.</li>
          <li>Matériel photo adapté aux conditions froides.</li>
          <li>Navigation : GPS + cartes papier.</li>
        </ul>

        <h2 className="text-xl font-bold text-accent mt-10 mb-4">Vivez un voyage inoubliable dans le Grand Nord</h2>
        <p className="text-foreground">
          Entre ciel étoilé, itinéraires sauvages et immersion culturelle, la Laponie est idéale pour se reconnecter à l'essentiel.
        </p>

        <div className="mt-12 rounded-2xl border border-accent/25 bg-accent/5 p-6 text-center">
          <p className="text-foreground font-medium">Vous sentez qu'il est temps de vous réapproprier votre temps ?</p>
          <p className="mt-2 text-muted-foreground">Transformons cette envie de Grand Nord en échappée sur-mesure.</p>
          <Link to="/devis" className="mt-4 inline-flex rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground hover:opacity-90">
            Débuter mon échappée
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

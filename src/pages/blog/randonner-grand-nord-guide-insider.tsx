import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function RandonnerGrandNordGuideInsider() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef7fb] via-white to-[#eef7fb]">
      <Navbar />
      <section className="w-full pt-28 pb-12 px-4 bg-secondary/60 border-b border-border text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
          L'échappée d'Emma - Randonner dans le Grand Nord : le guide de l'insider
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Les plus belles vues du Grand Nord se méritent. Voici comment aborder ces randonnées avec un esprit serein.
        </p>
      </section>

      <main className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-accent mb-6">L'illusion du balisage</h2>
        <p className="text-foreground mb-6">
          Ici, les marques sont rares, parfois inexistantes. Une application de randonnée est votre boussole,
          mais la lecture du terrain reste essentielle. Ne partez jamais sans préparation minimale.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">L'art du confort au sommet</h2>
        <p className="text-foreground mb-6">
          Prévoyez un T-shirt sec pour l'arrivée au sommet, et un autre dans la voiture pour le retour.
          Ce petit luxe évite le froid après l'effort et change complètement l'expérience.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Ma philosophie pour réussir votre marche</h2>
        <ul className="list-disc ml-6 space-y-2 text-foreground">
          <li>Le timing est roi : tôt le matin ou en fin d'après-midi pour la lumière et le calme.</li>
          <li>Sécurité d'abord : chaussures robustes, crampons, bâtons, eau et réserve calorique.</li>
          <li>Humilité et dépassement : avancer à son rythme, sans se comparer.</li>
        </ul>

        <p className="mt-10 text-foreground">
          Randonner dans le Nord n'est pas une performance, c'est une connexion. Je conçois vos itinéraires
          pour qu'ils respectent votre rythme, pas vos limites.
        </p>

        <div className="mt-12 rounded-2xl border border-accent/25 bg-accent/5 p-6 text-center">
          <p className="text-foreground font-medium">Vous sentez qu'il est temps de vous réapproprier votre temps ?</p>
          <p className="mt-2 text-muted-foreground">Parlons de votre projet et transformons cette envie de Grand Nord en expérience fluide et régénérante.</p>
          <Link to="/devis" className="mt-4 inline-flex rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground hover:opacity-90">
            Débuter mon échappée
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function SuedeSecreteImmersionForetBoreale() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef7fb] via-white to-[#eef7fb]">
      <Navbar />
      <section className="w-full pt-28 pb-12 px-4 bg-secondary/60 border-b border-border text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
          L'échappée d'Emma - Suède secrète : immersion en forêt boréale
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Il existe des voyages qui ne se racontent pas, ils se ressentent. Cette échappée en canoë en fait partie.
        </p>
      </section>

      <main className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-accent mb-6">Le silence comme boussole</h2>
        <p className="text-foreground mb-6">
          Loin de l'agitation, la vie se cale sur le rythme de la nature. Pas de moteur, pas de planning serré,
          juste le mouvement lent de la pagaie et la liberté de s'arrêter où vous vous sentez bien.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Oser sortir de sa zone de confort</h2>
        <p className="text-foreground mb-6">
          Le bivouac peut intimider, surtout quand on porte déjà la charge mentale du quotidien.
          Mais c'est aussi une renaissance : sans téléphone, sans bruit, l'essentiel reprend sa place.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Quelques clés pour votre propre échappée</h2>
        <ul className="list-disc ml-6 space-y-2 text-foreground">
          <li>La préparation est votre gage de liberté : chargement, météo, lecture de carte.</li>
          <li>Lâchez le planning : vous êtes libres d'alterner navigation et pauses longues.</li>
          <li>Cherchez à être là, pas à faire des kilomètres.</li>
        </ul>

        <p className="mt-10 text-foreground">
          L'itinérance en canoë n'est pas une performance sportive, c'est une reconnexion profonde.
          Si vous rêvez de cette Suède secrète, je suis là pour orchestrer votre parcours.
        </p>

        <div className="mt-12 rounded-2xl border border-accent/25 bg-accent/5 p-6 text-center">
          <p className="text-foreground font-medium">Vous sentez qu'il est temps de vous réapproprier votre temps ?</p>
          <p className="mt-2 text-muted-foreground">Parlons de votre projet et créons votre parenthèse nordique sur-mesure.</p>
          <Link to="/devis" className="mt-4 inline-flex rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground hover:opacity-90">
            Débuter mon échappée
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

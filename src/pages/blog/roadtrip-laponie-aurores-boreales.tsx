import React from 'react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

export default function RoadtripLaponieAuroresBoreales() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaf6fb] via-[#f7fafc] to-[#eaf6fb]">
      <Navbar />
      <section className="w-full pt-28 pb-12 px-4 bg-secondary/60 border-b border-border text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
          L'échappée d'Emma - Lofoten : Organiser votre échappée sereine dans le Grand Nord
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
          Besoin de reprendre votre souffle ? Je conçois des échappées sur-mesure aux Lofoten pour vous libérer de la logistique et vous reconnecter à l'essentiel.
        </p>
      </section>

      <main className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-accent mb-6">Lofoten : Pourquoi le silence est le vrai luxe d'une échappée nordique ?</h2>
        <p className="mb-4 text-lg text-foreground">
          Partir dans le Grand Nord, c'est souvent un rêve ancré dans l'imaginaire : des montagnes qui plongent dans l'océan, une lumière qui ne ressemble à aucune autre, et ce silence assourdissant qui fait enfin taire le tumulte du quotidien. Pourtant, une fois l'excitation de la réservation passée, une réalité plus terre-à-terre surgit souvent : comment transformer ce rêve en une parenthèse de sérénité absolue ?
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">La logistique : le paradoxe du voyageur</h2>
        <p className="mb-4 text-foreground">
          Les pays nordiques sont des terres de contrastes où la liberté est reine, mais où la logistique ne supporte pas l'improvisation. Entre les horaires des ferries, les tunnels qui se ferment la nuit, les spécificités des péages ou les règles parfois complexes des bureaux de douane pour la détaxe, le voyageur indépendant peut vite se retrouver submergé par une charge mentale imprévue.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Réapproprier son temps : mon rôle d'éclaireur</h2>
        <p className="mb-4 text-lg text-foreground">
          Concevoir une échappée, ce n'est pas simplement empiler des réservations sur un tableur. C'est comprendre le rythme des marées, anticiper les verrous techniques et dénicher ces instants hors radars que les guides classiques ignorent. Mon métier consiste à absorber cette complexité pour vous : la technique devient invisible, et sur place votre seule préoccupation est la contemplation.
        </p>

        <h2 className="text-xl font-bold text-foreground mt-10 mb-4">Le budget : une question de choix, pas d'interdit</h2>
        <p className="mb-4 text-foreground">
          Une échappée dans le Grand Nord n'a pas de prix unique. Qu'il s'agisse de cabanes rustiques ou d'hébergements de charme, de la haute saison ou des périodes plus calmes, le budget se sculpte selon vos envies de confort. Je vous partage aussi des pépites d'activités gratuites pour que la richesse du séjour ne dépende pas du budget, mais de votre curiosité.
        </p>

        <h2 className="text-xl font-bold text-accent mt-10 mb-4">Le luxe de ne rien avoir à prévoir</h2>
        <p className="mb-8 text-foreground">
          Pourquoi déléguer la préparation de votre voyage ? Parce que votre temps est votre ressource la plus précieuse. Je ne vous vends pas un voyage ; je conçois pour vous une parenthèse où le superflu s'efface pour laisser place à l'essentiel.
        </p>

        <div className="rounded-2xl border border-accent/25 bg-accent/5 p-6 text-center">
          <p className="text-base md:text-lg text-foreground">
            Vous sentez qu'il est temps de vous réapproprier votre temps ?
          </p>
          <p className="mt-2 text-muted-foreground">
            Parlons de votre projet et transformons cette envie de Grand Nord en une expérience fluide, sur-mesure et profondément régénérante.
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

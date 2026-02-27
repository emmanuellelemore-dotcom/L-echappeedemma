import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Banderoles diagonales sur toute la page */}
      <div className="pointer-events-none select-none absolute left-1/2 top-1/4 -translate-x-1/2 rotate-[-18deg] z-30 w-[180vw]">
        <div className="bg-blue-900/30 backdrop-blur-md py-10">
          <h2 className="text-5xl md:text-7xl font-bold text-white text-center tracking-widest drop-shadow-lg opacity-80 uppercase">
            En développement
          </h2>
        </div>
      </div>
      <div className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 rotate-[12deg] z-30 w-[180vw]">
        <div className="bg-blue-900/20 backdrop-blur-md py-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center tracking-widest drop-shadow-lg opacity-80 uppercase">
            On travaille dessus
          </h2>
        </div>
      </div>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-16 pt-28">
        <section className="max-w-2xl mx-auto mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">Blog Grand Nord&nbsp;: inspirations, conseils et aventures nordiques</h1>
          <p className="text-base md:text-lg text-gray-700">
            Retrouvez ici des articles, récits et conseils pour préparer votre voyage dans le Grand Nord : Norvège, Laponie, Islande, Suède. Aurores boréales, road trips, activités insolites et retours d’expérience pour vivre une aventure inoubliable.
          </p>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Où voir les aurores boréales dans le Grand Nord&nbsp;?</h2>
          <p>
            Les aurores boréales sont un phénomène magique à observer en Norvège, en Laponie, en Islande ou en Finlande. Pour maximiser vos chances, privilégiez un voyage en hiver, loin des lumières des villes. Les régions de Tromsø (Norvège), Rovaniemi (Laponie finlandaise) ou le sud de l’Islande sont réputées pour leurs nuits illuminées par l’<strong>aurora boreale</strong>.
          </p>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Road trip en Norvège : fjords, itinéraires et conseils</h2>
          <p>
            Un <strong>road trip en Norvège</strong> est l’une des plus belles façons de découvrir les fjords, les villages de pêcheurs et les paysages arctiques. Itinéraire conseillé&nbsp;: Oslo – Bergen – Ålesund – Lofoten. Prévoyez des étapes pour randonner, pêcher sous la glace ou partir en <strong>chasse aux aurores boréales</strong>.
          </p>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Séjour chiens de traîneau en Laponie</h2>
          <p>
            Vivre une aventure en <strong>chiens de traîneau en Laponie</strong> est une expérience inoubliable. Que ce soit en famille ou en couple, la Laponie offre des paysages enneigés, des nuits en cabane et la possibilité de croiser des rennes ou d’observer les aurores boréales.
          </p>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Islande : volcans, glaciers et chasse aux aurores boréales</h2>
          <p>
            L’<strong>Islande</strong> est la terre des contrastes : volcans, glaciers, sources chaudes et plages de sable noir. Un <strong>voyage en Islande</strong> en hiver permet de combiner road trip, randonnées et observation des aurores boréales.
          </p>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Activités incontournables dans le Grand Nord</h2>
          <ul className="list-disc ml-6">
            <li>Randonnées en Laponie et Norvège</li>
            <li>Pêche sous glace en Finlande</li>
            <li>Nuit en cabane ou igloo</li>
            <li>Marchés de Noël scandinaves</li>
            <li>Vacances familiales en Scandinavie</li>
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Inspirations et idées de voyages thématiques</h2>
          <ul className="list-disc ml-6">
            <li>Voyage Laponie en hiver</li>
            <li>Northern lights tour Finland</li>
            <li>Winter road trip Norway</li>
            <li>Husky sledding Lapland itinerary</li>
            <li>Iceland northern lights adventure</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}

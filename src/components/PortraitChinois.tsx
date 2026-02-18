import React from 'react';
import { BlurIn } from './BlurIn';

const colonneGauche = [
  { text: 'Chocolat', style: 'font-bold' },
  { text: 'Lève-tard', style: 'italic text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'Introvertie', style: 'font-bold' },
  { text: 'Plage', style: 'italic text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'Salé', style: 'font-bold' },
  { text: 'Chien', style: 'font-bold' },
  { text: 'Coucher de soleil', style: 'font-bold' },
  { text: 'Hôtel de luxe', style: 'italic text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'J’ai toujours chaud', style: 'italic text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'Maniaque', style: 'font-bold' },
  { text: 'Jus de fruit', style: 'font-bold' },
  { text: 'Talons', style: 'italic text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
];

const colonneDroite = [
  { text: 'Café', style: 'italic text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'Lève-tôt', style: 'font-bold' },
  { text: 'Extravertie', style: 'italic text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'Rando', style: 'font-bold' },
  { text: 'Sucré', style: 'italic text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'Chat', style: 'italic text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'Lever de soleil', style: 'italic text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'Van', style: 'font-bold' },
  { text: 'J’ai toujours froid', style: 'font-bold' },
  { text: 'Bordélique', style: 'italic text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'Verre de vin', style: 'italic text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'Baskets', style: 'font-bold' },
];

const PortraitChinois: React.FC = () => (
  <section className="w-full py-16 bg-transparent">
    <h2 className="text-3xl md:text-4xl font-serif text-center text-foreground mb-8">
      Avec un peu de légèreté
    </h2>
    <div className="w-full flex flex-col items-center justify-center mb-10">
      <div className="max-w-full w-full text-center">
        <p className="text-muted-foreground text-lg mb-10">
          Cette liste, elle est le reflet de qui je suis aujourd'hui. Parce qu’on change, on évolue...<br />
          Il y a plusieurs années encore, je ne jurais que par le soleil, les plages de sable fin et le confort absolu.<br />
          Mais ma perception du voyage a grandi avec moi. Aujourd’hui, je me concentre sur l’essentiel :<br />
          le vrai, le brut, l’instant que l’on vit pleinement sans artifice. Voici mon portrait, ici et maintenant :
        </p>
      </div>
    </div>
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <div className="flex flex-col items-center space-y-2">
          {colonneGauche.map((item, i) => (
            item.blur ? (
              <BlurIn key={item.text}>
                <span className={`text-2xl md:text-3xl font-serif text-center ${item.style}`}>{item.text}</span>
              </BlurIn>
            ) : (
              <span
                key={item.text}
                className={`text-2xl md:text-3xl font-serif text-center ${item.style}`}
              >
                {item.text}
              </span>
            )
          ))}
        </div>
        <div className="flex flex-col items-center space-y-2">
          {colonneDroite.map((item, i) => (
            item.blur ? (
              <BlurIn key={item.text}>
                <span className={`text-2xl md:text-3xl font-serif text-center ${item.style}`}>{item.text}</span>
              </BlurIn>
            ) : (
              <span
                key={item.text}
                className={`text-2xl md:text-3xl font-serif text-center ${item.style}`}
              >
                {item.text}
              </span>
            )
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default PortraitChinois;

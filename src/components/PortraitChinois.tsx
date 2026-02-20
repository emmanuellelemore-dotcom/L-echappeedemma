import React from 'react';
import { BlurIn } from './BlurIn';

const colonneGauche = [
  { text: 'Chocolat', style: 'italic font-bold text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'Lève-tard', style: '' },
  { text: 'Introvertie', style: 'italic font-bold text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'Plage', style: '' },
  { text: 'Salé', style: 'italic font-bold text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'Chien', style: 'italic font-bold text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'Coucher de soleil', style: 'italic font-bold text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'Hôtel de luxe', style: '' },
  { text: 'J’ai toujours chaud', style: '' },
  { text: 'Maniaque', style: 'italic font-bold text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'Jus de fruit', style: 'italic font-bold text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'Talons', style: '' },
];

const colonneDroite = [
  { text: 'Café', style: '' },
  { text: 'Lève-tôt', style: 'italic font-bold text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'Extravertie', style: '' },
  { text: 'Rando', style: 'italic font-bold text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'Sucré', style: '' },
  { text: 'Chat', style: '' },
  { text: 'Lever de soleil', style: '' },
  { text: 'Van', style: 'italic font-bold text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'J’ai toujours froid', style: 'italic font-bold text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
  { text: 'Bordélique', style: '' },
  { text: 'Verre de vin', style: '' },
  { text: 'Baskets', style: 'italic font-bold text-pink-400 underline underline-offset-4 decoration-pink-200', blur: true },
];

const PortraitChinois: React.FC = () => (
  <section className="w-full py-10 px-2 sm:px-6 bg-transparent overflow-x-hidden">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-center text-foreground mb-6">
      Avec un peu de légèreté
    </h2>
    <div className="w-full flex flex-col items-center justify-center mb-6">
      <div className="max-w-full w-full text-center">
        <p className="text-muted-foreground text-base sm:text-lg mb-6">
          Cette liste, elle est le reflet de qui je suis aujourd'hui. Parce qu’on change, on évolue...<br />
          Il y a plusieurs années encore, je ne jurais que par le soleil, les plages de sable fin et le confort absolu.<br />
          Mais ma perception du voyage a grandi avec moi. Aujourd’hui, je me concentre sur l’essentiel :<br />
          le vrai, le brut, l’instant que l’on vit pleinement sans artifice. Voici mon portrait, ici et maintenant :
        </p>
      </div>
    </div>
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl grid grid-cols-2 gap-4 sm:gap-8">
        <div className="flex flex-col items-center space-y-1">
          {colonneGauche.map((item, i) => (
            item.blur ? (
              <BlurIn key={item.text}>
                <span className={`text-lg sm:text-2xl md:text-3xl font-serif text-center ${item.style}`}>{item.text}</span>
              </BlurIn>
            ) : (
              <span
                key={item.text}
                className={`text-lg sm:text-2xl md:text-3xl font-serif text-center ${item.style}`}
              >
                {item.text}
              </span>
            )
          ))}
        </div>
        <div className="flex flex-col items-center space-y-1">
          {colonneDroite.map((item, i) => (
            item.blur ? (
              <BlurIn key={item.text}>
                <span className={`text-lg sm:text-2xl md:text-3xl font-serif text-center ${item.style}`}>{item.text}</span>
              </BlurIn>
            ) : (
              <span
                key={item.text}
                className={`text-lg sm:text-2xl md:text-3xl font-serif text-center ${item.style}`}
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

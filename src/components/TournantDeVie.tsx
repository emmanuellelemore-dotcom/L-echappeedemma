import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type TournantDeVieContextValue = {
  openDefinition: () => void;
};

const TournantDeVieContext = createContext<TournantDeVieContextValue | null>(null);

export const TournantDeVieProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      openDefinition: () => setIsOpen(true),
    }),
    []
  );

  return (
    <TournantDeVieContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">Marquer un tournant, respirer plus grand, s’ouvrir à l’ailleurs.</DialogTitle>
            <DialogDescription className="text-base leading-relaxed text-foreground">
              Le voyage est bien plus qu’une simple découverte géographique ; c’est une invitation à ralentir, à se reconnecter à l’essentiel et à voir le monde — et soi-même — autrement.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 text-sm md:text-base text-muted-foreground leading-relaxed">
            <div>
              <h3 className="text-foreground font-semibold mb-2">Qu’est-ce qu’un tournant de vie ?</h3>
              <p>
                C’est ce moment charnière où quelque chose évolue en nous. Un instant où l’on ressent l’envie de marquer une étape ou simplement de s’offrir un souffle nouveau.<br />
                Un tournant de vie, ce n’est pas forcément une rupture ou une tempête. Cela peut aussi être une prise de conscience, une envie de changement, un nouveau départ, ou le besoin d’honorer une étape importante de son parcours.<br />
                Un tournant de vie peut naître d’un changement, d’un accomplissement, d’une décision importante ou simplement d’un élan intérieur. C’est cette sensation qu’un cap se dessine, qu’un nouvel espace s’ouvre, et qu’il est temps de l’accueillir pleinement.<br />
                C’est ce point de passage entre ce qui a été… et tout ce qui peut encore s’ouvrir devant soi.
              </p>
            </div>

            <div className="rounded-lg p-5">
              <h3 className="text-foreground font-semibold mb-2">Des exemples de ces instants pour célébrer et se retrouver :</h3>
              <ul className="list-disc pl-5 space-y-4">
                <li>
                  <span className="text-accent font-semibold">Célébrer les liens et les joies :</span> Honorer un mariage, une lune de miel hors du temps, une naissance ou le bonheur de devenir grands-parents. Marquer un anniversaire symbolique pour fêter le chemin parcouru entouré de ceux que l'on aime.
                </li>
                <li>
                  <span className="text-accent font-semibold">Savourer un nouveau départ :</span> Transformer une reconversion professionnelle ou un départ en retraite en une véritable aventure. Redéfinir ses priorités et s'offrir le luxe de l'espace pour imaginer la suite de sa carrière avec enthousiasme.
                </li>
                <li>
                  <span className="text-accent font-semibold">Honorer une transition personnelle :</span> Traverser un changement de vie (séparation, deuil, syndrome du nid vide) avec douceur. Réapprendre à exister pour soi-même et transformer la solitude en une force tranquille face aux grands espaces.
                </li>
                <li>
                  <span className="text-accent font-semibold">Le renouveau après l'épreuve :</span> Célébrer la fin des soins ou une rémission. Se réapproprier son corps et ses sensations loin des protocoles, pour remplacer le blanc des hôpitaux par le bleu profond des fjords et le vert des aurores.
                </li>
                <li>
                  <span className="text-accent font-semibold">L'urgence de vivre :</span> Parce que la vie nous rappelle que le temps est le bien le plus précieux. Ne plus repousser ce rêve de Grand Nord et oser enfin vivre l'immensité pour se sentir intensément vivant.
                </li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TournantDeVieContext.Provider>
  );
};

export const TournantDeVieText = ({ className = '' }: { className?: string }) => {
  const context = useContext(TournantDeVieContext);

  if (!context) {
    return <span className={className}>tournant de vie</span>;
  }

  return (
    <button
      type="button"
      onClick={context.openDefinition}
      className={`inline font-semibold text-accent hover:text-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm transition-colors ${className}`}
    >
      tournant de vie
    </button>
  );
};

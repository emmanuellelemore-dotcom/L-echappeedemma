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
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">Marquer un tournant, respirer à nouveau</DialogTitle>
            <DialogDescription className="text-base leading-relaxed text-foreground">
              Le voyage est bien plus qu'une simple découverte géographique ; c'est parfois le seul moyen de mettre de la distance avec ce que l'on laisse derrière soi.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 text-sm md:text-base text-muted-foreground leading-relaxed">
            <div>
              <h3 className="text-foreground font-semibold mb-2">Qu’est-ce qu’un tournant de vie ?</h3>
              <p>
                C’est ce moment de bascule, souvent intense, où l’on ressent le besoin viscéral de marquer le coup. C’est le point de rencontre entre la fin d’un chapitre et l’incertitude du suivant. Que ce soit une transition choisie ou une épreuve imposée par la vie, c'est l'instant où l'on a besoin de clore une page pour pouvoir enfin en écrire une nouvelle, avec plus de clarté et de sérénité.
              </p>
            </div>

            <div>
              <h3 className="text-foreground font-semibold mb-2">Des exemples de ces moments où le besoin de souffle se fait sentir :</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="text-foreground font-medium">Le renouveau après la maladie :</span> Célébrer la fin des soins ou une rémission. Se réapproprier son corps et ses sensations loin des protocoles, pour remplacer le blanc des hôpitaux par le bleu des fjords.
                </li>
                <li>
                  <span className="text-foreground font-medium">Un nouveau départ professionnel :</span> Se retrouver après un burn-out, marquer une reconversion ou savourer l'entrée en retraite pour redéfinir ses propres priorités.
                </li>
                <li>
                  <span className="text-foreground font-medium">Une transition personnelle :</span> Traverser une séparation, un deuil, ou surmonter le syndrome du "nid vide" pour réapprendre à exister pour soi-même.
                </li>
                <li>
                  <span className="text-foreground font-medium">Un changement de cap :</span> Passer un cap d'âge symbolique (30, 40, 50 ans...) et ressentir le besoin de faire le point face à l'immensité pour retrouver son propre cap.
                </li>
                <li>
                  <span className="text-foreground font-medium">L'urgence de vivre :</span> Parce que certaines épreuves nous rappellent que le temps est précieux, et qu'il est temps de réaliser ce rêve de Grand Nord que l'on repoussait sans cesse.
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

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-3">
    <h2 className="text-xl md:text-2xl font-serif text-foreground">{title}</h2>
    <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
  </section>
);

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24 px-4 md:px-6 max-w-5xl mx-auto space-y-6">
        <header className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground">Mentions légales</h1>
          <p className="text-muted-foreground leading-relaxed">
            Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique,
            vous trouverez ci-dessous les informations relatives à l’édition et à l’exploitation du site
            L’échappée d’Emma.
          </p>
        </header>

        <Section title="1. Éditeur du site">
          <p>Le site est édité par L’échappée d’Emma, entrepreneure individuelle.</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Responsable de publication : Emmanuelle Lemore</li>
            <li>Structure juridique : Entreprise individuelle</li>
            <li>SIRET : ??</li>
            <li>Email : hello-lechappeedemma@gmail.com</li>
            <li>Téléphone : 06 78 21 88 23</li>
            <li>Adresse : 94370 Sucy-en-Brie, France</li>
          </ul>
          <p>
            Hébergeur : OVHcloud, Roubaix, 1007 (composez le +33 9 72 10 10 07 depuis une ligne en dehors de la France).
          </p>
        </Section>

        <Section title="2. Conditions d’utilisation du site">
          <p>
            L’utilisation du site implique l’acceptation pleine et entière des présentes conditions d’utilisation.
            Celles-ci peuvent être mises à jour à tout moment ; les utilisateurs sont donc invités à les consulter régulièrement.
          </p>
          <p>
            Le site est normalement accessible à tout moment. Une interruption pour maintenance technique peut toutefois survenir.
            L’échappée d’Emma s’efforce, dans la mesure du possible, de limiter la durée de ces interruptions.
          </p>
          <p>
            L’échappée d’Emma est tenue à une obligation de moyens et ne peut garantir l’absence totale d’erreurs,
            d’indisponibilités ou d’interruptions du service.
          </p>
        </Section>

        <Section title="3. Description des services proposés">
          <p>
            Le site a pour objet de présenter les activités de L’échappée d’Emma : création d’itinéraires sur mesure,
            accompagnement au voyage et services de conseil.
          </p>
          <p>
            Les informations publiées sont fournies à titre indicatif et peuvent évoluer. Malgré le soin apporté à leur rédaction,
            des omissions ou inexactitudes peuvent exister.
          </p>
        </Section>

        <Section title="4. Propriété intellectuelle">
          <p>
            L’ensemble des contenus présents sur le site (textes, visuels, logos, charte graphique, éléments techniques,
            documents et supports) est protégé par le droit de la propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, diffusion, adaptation ou exploitation, totale ou partielle,
            sans autorisation écrite préalable, est strictement interdite.
          </p>
          <p>
            Les carnets de voyage remis aux clients sont destinés à un usage strictement personnel.
            Toute copie, diffusion ou revente à des tiers est interdite.
          </p>
        </Section>

        <Section title="5. Cookies et liens hypertextes">
          <p>
            La navigation sur le site peut entraîner le dépôt de cookies destinés à améliorer l’expérience utilisateur
            et à mesurer l’audience.
          </p>
          <p>
            Vous pouvez accepter ou refuser les cookies via la bannière prévue à cet effet.
            Le refus des cookies peut limiter certaines fonctionnalités du site.
          </p>
          <p>
            Le site peut contenir des liens vers des sites tiers. L’échappée d’Emma n’exerce aucun contrôle sur ces contenus externes
            et ne peut être tenue responsable de leur disponibilité ou de leur contenu.
          </p>
        </Section>

        <Section title="6. Données personnelles">
          <p>
            L’échappée d’Emma collecte et traite certaines données personnelles uniquement dans le cadre des services proposés
            (formulaire de contact, demande d’esquisse/devis, échanges clients).
          </p>
          <p>
            Les données sont traitées de manière confidentielle et ne sont ni vendues, ni cédées à des tiers à des fins commerciales.
          </p>
          <p>
            Conformément à la réglementation applicable (RGPD et loi Informatique et Libertés),
            vous disposez de droits d’accès, de rectification, d’effacement, d’opposition et de limitation du traitement.
          </p>
          <p>Pour exercer vos droits, vous pouvez écrire à : hello-lechappeedemma@gmail.com</p>
          <p>
            Une réponse vous sera apportée dans un délai maximal d’un mois à compter de la réception de votre demande.
          </p>
        </Section>

        <p className="text-sm text-muted-foreground">Dernière mise à jour : 11 mars 2026.</p>
      </main>

      <Footer />
    </div>
  );
};

export default MentionsLegales;

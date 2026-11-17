import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { findArticle } from './articles';
import { isVisible } from './visibility';

/**
 * Lecteur Markdown minimal pour les articles du blog (sans dépendance).
 *
 * Syntaxe prise en charge :
 *   ## Titre de section        ### Sous-titre
 *   Paragraphe avec **gras**, *italique* et [lien](/blog/autre-article)
 *   - liste à puces            1. liste numérotée
 *   > [!astuce] Conseil pratique
 *   > [!attention] Mise en garde
 *   > [!emma] Consigne pour Emma : à remplacer par son vécu avant publication
 *   ## Questions fréquentes     (les ### qui suivent deviennent la FAQ de Google)
 */

export type CalloutKind = 'astuce' | 'attention' | 'emma' | 'note';

export type Block =
  | { type: 'h2' | 'h3'; text: string; id: string }
  | { type: 'p'; text: string }
  | { type: 'ul' | 'ol'; items: string[] }
  | { type: 'callout'; kind: CalloutKind; text: string };

export const slugify = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const calloutKind = (raw: string): CalloutKind => {
  const value = raw.toLowerCase();
  return value === 'astuce' || value === 'attention' || value === 'emma' ? value : 'note';
};

export const parseMarkdown = (source: string): Block[] => {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let listItems: string[] = [];
  let quote: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type: 'p', text: paragraph.join(' ') });
    paragraph = [];
  };
  const flushList = () => {
    if (listType && listItems.length) blocks.push({ type: listType, items: listItems });
    listType = null;
    listItems = [];
  };
  const flushQuote = () => {
    if (!quote.length) return;
    const text = quote.join(' ').trim();
    const match = text.match(/^\[!(\w+)\]\s*([\s\S]*)$/);
    blocks.push({ type: 'callout', kind: match ? calloutKind(match[1]) : 'note', text: match ? match[2] : text });
    quote = [];
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
    flushQuote();
  };

  for (const rawLine of source.replace(/\r\n/g, '\n').split('\n')) {
    const line = rawLine.trimEnd();
    if (!line.trim()) {
      flushAll();
      continue;
    }

    const heading = line.match(/^(#{2,3})\s+(.*)$/);
    if (heading) {
      flushAll();
      const text = heading[2].trim();
      blocks.push({ type: heading[1].length === 2 ? 'h2' : 'h3', text, id: slugify(text) });
      continue;
    }

    const quoteLine = line.match(/^>\s?(.*)$/);
    if (quoteLine) {
      flushParagraph();
      flushList();
      quote.push(quoteLine[1]);
      continue;
    }

    const bullet = line.match(/^[-*]\s+(.*)$/);
    const numbered = line.match(/^\d+[.)]\s+(.*)$/);
    if (bullet || numbered) {
      flushParagraph();
      flushQuote();
      const type = bullet ? 'ul' : 'ol';
      if (listType !== type) flushList();
      listType = type;
      listItems.push((bullet ?? numbered)![1]);
      continue;
    }

    flushList();
    flushQuote();
    paragraph.push(line.trim());
  }
  flushAll();
  return blocks;
};

/** Texte brut (sans syntaxe Markdown), pour les données structurées */
export const plainText = (text: string) =>
  text.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

/** Questions de la section « Questions fréquentes » */
export const extractFaq = (blocks: Block[]) => {
  const start = blocks.findIndex((block) => block.type === 'h2' && block.id.startsWith('questions-frequentes'));
  if (start === -1) return [];
  const faq: { question: string; answer: string }[] = [];
  for (const block of blocks.slice(start + 1)) {
    if (block.type === 'h2') break;
    if (block.type === 'h3') faq.push({ question: block.text, answer: '' });
    else if (faq.length && block.type === 'p') faq[faq.length - 1].answer += `${faq[faq.length - 1].answer ? ' ' : ''}${plainText(block.text)}`;
    else if (faq.length && (block.type === 'ul' || block.type === 'ol'))
      faq[faq.length - 1].answer += ` ${block.items.map(plainText).join(' ; ')}`;
  }
  return faq.filter((item) => item.answer);
};

export const readingMinutes = (source: string) => Math.max(1, Math.round(source.split(/\s+/).filter(Boolean).length / 220));

const linkClass = 'font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent';

/**
 * Un lien vers un article du blog pas encore publié (brouillon) s'affiche en texte simple
 * sur le site en ligne : pas de lien cassé, et il devient cliquable dès la publication.
 */
const isLinkable = (path: string) => {
  const slug = path.match(/^\/blog\/([^/?#]+)/)?.[1];
  if (!slug) return true;
  const target = findArticle(slug);
  return Boolean(target && isVisible(target));
};

export const renderInline = (text: string): ReactNode[] => {
  const pattern = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1]) nodes.push(<strong key={key++} className="font-semibold text-primary">{match[1]}</strong>);
    else if (match[2]) nodes.push(<em key={key++}>{match[2]}</em>);
    else if (match[4].startsWith('/'))
      nodes.push(
        isLinkable(match[4])
          ? <Link key={key++} to={match[4]} className={linkClass}>{match[3]}</Link>
          : match[3],
      );
    else
      nodes.push(
        <a key={key++} href={match[4]} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {match[3]}
        </a>,
      );
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
};

const CALLOUTS: Record<CalloutKind, { label: string; className: string }> = {
  astuce: { label: 'Astuce', className: 'border-accent/40 bg-accent/[0.06]' },
  attention: { label: 'Bon à savoir', className: 'border-primary/25 bg-primary/[0.04]' },
  note: { label: 'À noter', className: 'border-border bg-muted/50' },
  emma: { label: 'À compléter par Emma', className: 'border-dashed border-accent bg-accent/10' },
};

interface MarkdownProps {
  blocks: Block[];
  /** Afficher les encadrés « À compléter par Emma » (uniquement en local) */
  showEmmaNotes: boolean;
}

export const Markdown = ({ blocks, showEmmaNotes }: MarkdownProps) => (
  <>
    {blocks.map((block, index) => {
      switch (block.type) {
        case 'h2':
          return (
            <h2 key={index} id={block.id} className="mt-14 scroll-mt-28 font-serif text-2xl leading-snug text-primary md:text-[2rem]">
              {block.text}
            </h2>
          );
        case 'h3':
          return (
            <h3 key={index} id={block.id} className="mt-9 scroll-mt-28 font-serif text-xl text-primary md:text-[1.4rem]">
              {block.text}
            </h3>
          );
        case 'p':
          return (
            <p key={index} className="mt-5 text-base leading-[1.85] text-foreground/85 md:text-[1.07rem]">
              {renderInline(block.text)}
            </p>
          );
        case 'ul':
          return (
            <ul key={index} className="mt-5 space-y-3">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex gap-3 text-base leading-relaxed text-foreground/85 md:text-[1.05rem]">
                  <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          );
        case 'ol':
          return (
            <ol key={index} className="mt-5 list-decimal space-y-3 pl-6 text-base leading-relaxed text-foreground/85 marker:font-semibold marker:text-accent md:text-[1.05rem]">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="pl-1">{renderInline(item)}</li>
              ))}
            </ol>
          );
        case 'callout': {
          if (block.kind === 'emma' && !showEmmaNotes) return null;
          const callout = CALLOUTS[block.kind];
          return (
            <aside key={index} className={`mt-7 rounded-2xl border p-5 md:p-6 ${callout.className}`}>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-accent">{callout.label}</p>
              <p className="mt-2 text-[0.97rem] leading-relaxed text-foreground/85">{renderInline(block.text)}</p>
            </aside>
          );
        }
        default:
          return null;
      }
    })}
  </>
);

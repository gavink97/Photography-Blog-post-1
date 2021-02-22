import { EmblaCarousel } from '../vanilla';
import { EmblaOptions } from '../vanilla/components/options';
declare type ViewportRef = <ViewportElement extends HTMLElement>(instance: ViewportElement | null) => void;
export declare type UseEmblaCarousel = [ViewportRef, EmblaCarousel | undefined];
declare function useEmblaCarousel(options?: EmblaOptions): UseEmblaCarousel;
export { useEmblaCarousel };

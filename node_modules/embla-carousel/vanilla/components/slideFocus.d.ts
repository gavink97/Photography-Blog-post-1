import { EventStore } from './eventStore';
import { ScrollTo } from './scrollTo';
declare type Params = {
    root: HTMLElement;
    scrollTo: ScrollTo;
    slidesToScroll: number;
};
export declare type SlideFocus = {
    addActivationEvents: (slides: HTMLElement[]) => void;
    removeAllEvents: EventStore['removeAll'];
};
export declare function SlideFocus(params: Params): SlideFocus;
export {};

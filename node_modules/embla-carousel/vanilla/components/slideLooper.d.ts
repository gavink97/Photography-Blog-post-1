import { Axis } from './axis';
import { Direction } from './direction';
import { SlidesInView } from './slidesInView';
import { Vector1D } from './vector1d';
declare type Params = {
    axis: Axis;
    direction: Direction;
    scrollSnaps: number[];
    viewSize: number;
    location: Vector1D;
    slideSizes: number[];
    contentSize: number;
    slidesInView: SlidesInView;
};
declare type LoopPoint = {
    point: number;
    location: number;
    index: number;
    getTarget: () => number;
};
export declare type SlideLooper = {
    canLoop: () => boolean;
    clear: (slides: HTMLElement[]) => void;
    loop: (slides: HTMLElement[]) => void;
    loopPoints: LoopPoint[];
};
export declare function SlideLooper(params: Params): SlideLooper;
export {};

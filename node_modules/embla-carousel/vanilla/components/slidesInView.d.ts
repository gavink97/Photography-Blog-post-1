declare type Params = {
    contentSize: number;
    slideSizes: number[];
    viewSize: number;
    loop: boolean;
    inViewThreshold: number;
};
declare type SlideBound = {
    start: number;
    end: number;
    index: number;
};
export declare type SlidesInView = {
    check: (location: number) => number[];
    findSlideBounds: (offset: number, threshold?: number) => SlideBound[];
};
export declare function SlidesInView(params: Params): SlidesInView;
export {};

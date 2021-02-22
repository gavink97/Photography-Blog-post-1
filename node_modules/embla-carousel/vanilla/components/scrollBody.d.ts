import { Vector1D } from './vector1d';
declare type Params = {
    location: Vector1D;
    speed: number;
    mass: number;
};
export declare type ScrollBody = {
    direction: () => number;
    seek: (v: Vector1D) => ScrollBody;
    settle: (v: Vector1D) => boolean;
    update: () => void;
    useBaseMass: () => ScrollBody;
    useBaseSpeed: () => ScrollBody;
    useMass: (n: number) => ScrollBody;
    useSpeed: (n: number) => ScrollBody;
};
export declare function ScrollBody(params: Params): ScrollBody;
export {};

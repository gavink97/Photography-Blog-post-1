export declare type DirectionOption = 'ltr' | 'rtl';
export declare type Direction = {
    applyTo: (n: number) => number;
};
export declare function Direction(direction: DirectionOption): Direction;

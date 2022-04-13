import PathNode from "./Node"

console.log( 'loaded : Position.ts' )

// import 

interface Position {
    x : number;
    y : number;
}

export default Position

export interface HTMLNode {
    generate : boolean;
    main : HTMLElement;
    g? : HTMLElement;
    h? : HTMLElement;
    f? : HTMLElement;
    ball? : HTMLElement;
}

export interface PathResult {
    checked? : Position[] | any[];
    path? : any[]
}

export interface NodeProps extends Position{
    position? : Position;
    generate? : boolean;
    parent? : Position;
    genearte? : boolean;
}

export interface MatrixProps {
    height : number,
    width : number,
    generateHtml? : boolean,
    borders? : number[][]
}

export interface BallProps {
    color? : number,
    // contain? : boolean,
}


export interface StringArray {
    [ index : number ] : string;
    length : number
}

//// zastosowane w board.ts ////
export interface CallbackFunc {
    ( isStopped : boolean ): void;
}

//// interfejs funkcji ////
export interface CallbackListener {
    (ev: Event, that : PathNode ) : any
}

//// interfejs metody ////
export interface TimeoutedParams {
    (
        count : number,
        crossections : PathNode[],
        freeFields : Position[],
        isTimeout? : boolean
    ) : number ;
}

//// interfejs klasy ////
export interface NodeImplementation {
    reset : () => void;
    resetHtml : () => void;
    addEventListener : (
        event : string, 
        callback : CallbackListener
    ) => void;
}
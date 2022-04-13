console.log( 'loaded : Matrix.ts' )

import { reduceArr, compareObj, cloneObj, join } from '../voids'

import PathNode from './Node'
import Position, { HTMLNode, MatrixProps, PathResult } from './Interfaces'

export default class Matrix {

    //// VARS ////

    /// board size ///
    private _height : number = 1
    private _width  : number = 1

    /// html board ///
    private readonly _html : HTMLNode = {
        generate : false,
        main : document.createElement('div')
    }
    
    /// logical board ///
    private _borders : number[][]
    private _fields : PathNode[][]

    /// endpoints ///
    private _start : PathNode
    private _end : PathNode

    //// MAIN ////
    public constructor ( props : MatrixProps ) {
        this._width = props.width || this._width
        this._height = props.height || this._height

        this._html.generate = props.generateHtml || this._html.generate
        this._borders = props.borders || this._borders

        this._init()
    }


    //// VOIDS ////
    private _init () : void {
        this._fields = []

        const { _width, _height } = this
        
        for (let i = 0; i < _width; i++) {
            
            const fieldRow : PathNode [] = []
            
            for ( let j = 0; j < _height; j++) {
                fieldRow.push ( new PathNode({
                    x : j,
                    y : i,
                    generate : this._html.generate
                }))
            }

            this._fields.push ( fieldRow )
        }

        this.reset()
        
        if ( this._html.generate )
            this.generateHtml ()
    
    }

    //// RESET AND REFRESH ////

    public reset ( ) : void {
        for ( const row of this._fields ) {
            for ( const child of row ) {
                child.reset ( )
            }
        }
        this.resetBorders ( )
    }

    public resetBorders ( ) : void {
        const fields : PathNode[][] = this._fields
        const borders : number[][] = this._borders

        for ( let i in borders ) {
            for ( let j in borders[i] ) {
                fields[i][j].isBorder = !!borders[i][j]
                if ( this._html.generate)
                    fields[i][j].reset()
            }
        }
    }

    //// HTML ////
    protected generateHtml ( ) : void {
        /// add class ///
        this.html.classList.add('matrix')

        /// append ///

        for (const row of this._fields)
            for ( const child of row )
                this.html.appendChild( child.html )

        this.html.style.gridTemplateColumns = `repeat(${ this._fields.length }, auto)`
        
    }


    addEventListener( event : string, callback: (ev: Event, that: PathNode)=> any) {
        for (const row of this._fields)
            for ( const child of row )
                child.addEventListener( event, callback )
    }

    //// PATHFINDING ////

    public findPath (
        _start : PathNode = this._start,
        _end : PathNode = this._end,
        maximum : number = Infinity 
    ) : PathResult {

        // console.log(_start, _end)

        /// translate positions to nodes ///
        if ( _start.x != undefined || _start.y != undefined ) 
            _start = this.find ( _start )
        if ( _end.x != undefined || _end.y != undefined ) 
            _end = this.find ( _end )

        let openList : PathNode[] = [ _start ]
        let closedList : PathNode[] = []

        let result : PathResult = {}

        let repeats : number = 0
        let allChildren : Position[] | PathNode[] = []

        while ( openList.length != 0 ) {
            repeats++

            /// get current node ///
            const currentNode : PathNode = openList.reduce( 
                ( min, field ) => min.f < field.f 
                ? min
                : field
            )
            openList = reduceArr ( openList, currentNode )
            closedList.push ( currentNode )

            /// found the goal ///
            if ( compareObj ( currentNode.position, _end.position ) ) {
                const path : Position[] = []
                // console.log(currentNode, 'currentNode')
                let current : Position = currentNode.position
                let r = 0

                while ( !compareObj( current, _start.position ) ) {

                    let next : Position = this.getNode ( current ).parent

                    if ( compareObj ( next, current ) ) 
                        break
                    
                    path.push( current )
                    current = next
                }

                result = {
                    // checked : [ ...closedList, ...openList ],
                    checked : join( closedList, openList ),
                    path : path.reverse()
                }

                break
            }

            
            /// generate children ///
            const children : PathNode[] | Position[]  = this.getNeighbours ( currentNode.position )

            // allChildren = [ ...allChildren, ...children ]

            allChildren = join( allChildren, children )

            for ( const childP of children ) {
                // console.log(childP)
                const child = this.getNode(childP)

                if ( closedList.filter( closed => closed.x == child.x && closed.y == child.y ).length )
                    continue
                
                /// set f, g and h
                child.g = currentNode.g + 1 // zmienic, jeśli trzeba
                child.h = this.distance( child.position, _end.position )
                child.f = child.g + child.h
    
                /// CHild is alredy in openList
                if ( openList.filter( open => open.x == child.x && open.y == child.y ).length) {
                    const max = Math.max.apply( Math, openList.map( function (o) {
                        return o.g
                    }))
                    
                    if ( child.g > max )
                        continue
                }


                // add the child to the openlist
                openList.push(child)

            }
            
        }
        
        return result
    }

    protected getNeighbours ( position : Position ) : Position[] {
        const finalResult : Position[] = []
        const result : Position[] = []
        const neighbours : Position[] = [
            { x : 0,    y : -1  },
            { x : 1,    y : 0   },
            { x : 0,    y : 1   },
            { x : -1,   y : 0   }
        ]

        for ( const neighbour of neighbours ) {
            const currentPosition : Position = this.translate ( position, neighbour )

            if ( this.isOnBoard( currentPosition ) && !this.isAlreadyCounted( currentPosition ) && !this.isBorder( currentPosition ) )
                result.push( currentPosition )
        }
    

        for ( const neighbour of result ) {
            const { x, y } = neighbour
            this._fields[y][x].parent = position

            finalResult.push( this._fields[y][x] )
        }


        return finalResult
    }

    //// SUPPORTING METHODS ////

    protected distance (
        from : Position | PathNode,
        to : Position | PathNode 
    ) {
        const { pow } = Math
        return pow( from.x - to.x, 2) + pow( from.y - to.y, 2 )
    }

    public find ( 
        pos : Position | PathNode 
    ) : PathNode {
        return this._fields[ pos.y ][ pos.x ]
    }

    protected translate ( 
        pos : Position | PathNode, 
        translation : Position | PathNode 
    ) : Position {
        const clone = cloneObj ( pos )
        clone.x += +translation.x
        clone.y += +translation.y
        return clone
    }

    //// BOOLEANS ////

    protected isOnBoard ( position : Position | PathNode ) : boolean {
        if ( position.x < 0 ) return false
        if ( position.x >= this._fields.length ) return false
        
        if ( position.y < 0 ) return false
        if ( position.y >= this._fields[0].length ) return false

        return true    
    }

    protected isAlreadyCounted ( position : Position | PathNode ) : boolean {
        return this.find( position ).f > 0
    }

    isBorder ( position : Position | PathNode ) : boolean {
        const { x, y } = position
        return this._borders[ y ] [ x ] == -1
    }

    getNode ( position : Position ) : PathNode{
        return this._fields[ position.y ][position.x]
    }


    //// SETTERS ////
    set height ( height : number ) {
        this._height = height
    }

    set width ( width : number ) {
        this._width = width
    }

    set borders ( borders : number[][] ) {
        this._borders = borders
    }

    set start ( start : PathNode ) {
        this._start = start
    }

    set end ( end : PathNode) {
        this._end = end
    }

    //// GETTERS ////
    get html (  ) {
        return this._html.main
    }

    get height ( ) { return this._height }
    get width ( ) { return this._width }

    get fields ( ) { return this._fields }
    get borders ( ) { return this._borders }
    
    get start ( ) { return this._start}
    get end ( ) { return this._end}
}
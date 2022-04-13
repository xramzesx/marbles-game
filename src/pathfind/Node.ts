console.log ( 'loaded : Node.ts' );

import Position, { BallProps, CallbackListener, HTMLNode, NodeImplementation, NodeProps } from "./Interfaces";
import defaults from '../defaults'

export default class PathNode implements NodeImplementation {

    //// PRIVATE VARS ////

    /// distance and heuristic ///
    private _g : number = 0
    private _h : number = 0

    /// final cost ///
    private _f : number = 0

    /// node position ///
    private _position : Position = {
        x : 0,
        y : 0
    }

    /// is already fill ///
    private _isBorder : boolean = false

    /// pseudorecursion ///
    private _parent : Position


    //// HTML ////

    private readonly _html : HTMLNode = {
        generate : false,
        main : document.createElement('div'),
        g : document.createElement('div'),
        h : document.createElement('div'),
        f :  document.createElement('div'),

        ball : document.createElement('div')
    }

    /// ///
    private _ball : BallProps = {
        color : -1
    }
    

    //// MAIN ////
    public constructor ( props : NodeProps ) {
        this._position = props.position || {
            x : props.x || this._position.x,
            y : props.y || this._position.y
        }
        
        this._html.generate = props.generate || this._html.generate
        
        this._parent = props.parent
        // console.log(this._html.generate)
        if ( this._html.generate )
            this.generateHtml()

    }


    //// VOIDS ////

    public reset (  ) : void {
        this.g = 0
        this.h = 0
        this.f = 0

        this._parent = undefined

        if (this._html.generate)
            this.resetHtml()
    }

    //// HTML VOIDS ////

    protected generateHtml () : void {
        
        this._html.g.classList.add('matrix__g')
        this._html.h.classList.add('matrix__h')
        this._html.f.classList.add('matrix__f')
        this._html.ball.classList.add('matrix__ball')
        
        this._html.main.classList.add('matrix__field')
        
        this.html.appendChild( this._html.g )
        this.html.appendChild( this._html.h )
        this.html.appendChild( this._html.f )
        this.html.appendChild( this._html.ball )
        
        this.reset()
    }

    resetHtml () : void {
        this.html.className = "matrix__field"
        if (this.isBorder){
            this.html.classList.add('matrix__field--border')
            this._html.ball.classList.add('matrix__ball--show')
            this.color = this._ball.color
            // this._html.ball.style.backgroundColor = defaults.colors[ this._ball.color ]
        } else {
            this._html.ball.classList.remove('matrix__ball--show')
        }
    }

    addEventListener( event : string, callback: CallbackListener ) : void {
        this.html.addEventListener( event, e => {
            callback(e, this)
        })
    }
    
    
    //// GETTERS ////

    get html () : HTMLElement {
        return this._html.main
    }

    get parent () : Position {  return this._parent }
    get position () : Position { return this._position }
    get positionJSON () : string { return JSON.stringify( this._position ) }

    get x () : number { return this._position.x }
    get y () : number { return this._position.y }

    get g () : number { return this._g }
    get h () : number { return this._h }
    get f () : number { return this._f }

    get isBorder () : boolean { return this._isBorder }
    get classList ( ) { return this.html.classList }
    get ball () { return this._ball }
    get color () { return this._ball.color }

    //// SETTERS ////

    set parent ( v : Position ) { this._parent = v }

    set x ( v : number ) { this._position.x = v }
    set y ( v : number ) { this._position.y = v }

    set g ( v : number ) { 
        this._g = v
        if ( this._html.generate )
            this._html.g.innerHTML = `${v}`
    }

    set h ( v : number ) { 
        this._h = v        
        if ( this._html.generate )
            this._html.h.innerHTML = `${v}`
    }
    set f ( v : number ) { 
        this._f = v
        if ( this._html.generate )
            this._html.f.innerHTML = `${v}`
    }

    set isBorder ( v : boolean ) { 
        this._isBorder = v
    }

    set color ( v : number ) {
        let color = 
            v >= 0 && v < defaults.colors.length 
                ? defaults.colors[v] 
                : ""
        
        if ( color ) {
            this._html.ball.style.filter = `drop-shadow( 4px 4px 0 ${color})`
        } else {
            this.isBorder = false    
            this._html.ball.style.filter = ''
        }
        
        this._html.ball.style.backgroundColor = color
        this._ball.color = v
    }

    set ball ( v : BallProps ) {
        if ( this.isBorder || v.color < 0 && v.color >= defaults.colors.length ){
            this._ball = { color : -1 }
            this._html.ball.classList.remove('matrix__ball--show')
            // this._html.ball.classList.remove('matrix__ball')

            this._html.ball.style.backgroundColor = ''
            this._html.ball.style.filter = ''

        } else {
            // this._html.ball.classList.add('matrix__ball')
            this._html.ball.classList.add('matrix__ball--show')

            //// UNCOMMENT THIS IF SMTH GOES WRONG ////
            // this.color = v.color

            // const color =  defaults.colors[v.color]
            // this._html.ball.style.backgroundColor = color
            // this._html.ball.style.filter = `drop-shadow( 4px 4px 0 ${color})`
        }

        this.color = v.color

        this._ball = { ...v }
    }
}
console.log('loaded : Board.ts')

import { log, popOut, time } from '../decorators'
import defaults from '../defaults'
import Position, { BallProps, CallbackFunc, MatrixProps, PathResult, TimeoutedParams } from '../pathfind/Interfaces'
import Matrix from '../pathfind/Matrix'
import PathNode from '../pathfind/Node'
import { getRandom } from '../voids'

export default class Board extends Matrix {
    
    private _path : PathResult = {
        checked : [],
        path : []
    }
    
    private _drawedBalls : BallProps[] = []
    private _checkedNodes : PathNode[] = []
    private _matchedNodes : PathNode[] = []

    //// setinterval returns number ////
    private _timeInterval : number
    private _time : number = 0

    private _isStopped : boolean = false
    private _points : number = 0;
    public stage : number = 0;

    private _onGameStopped : {( isStopped : boolean ): void;}

    constructor ( 
        props : MatrixProps 
    ) {
        super ( props )
        // this.drawBalls()
        this.timer = this.timer.bind(this)
        this.timer = this.timer.bind(this)
        this._timeoutedHitBall = this._timeoutedHitBall.bind(this)
        this._timeoutedSelectMatched = this._timeoutedSelectMatched.bind(this)
        this.gameOver = this.gameOver.bind(this)
    }

    //// OVERRIDE ////

    findPath ( 
        end : PathNode 
    ) : PathResult {
        if ( super.start ) {

            if ( this._path.checked )
                this._path.checked.filter( checked => { super.find( checked ).reset() })
    
                // for ( let i in this._path.checked ) {
                //     this._path.checked[i].reset()
                // }
    
            if ( this._path.path )
                this._path.path.filter( path => { super.find( path ).reset() } )
            // for ( let i in this._path.path ) {
            //     this._path.path[i].reset()
            // }
    
            this._path = super.findPath(
                super.start,
                end
            )
    
            if ( this._path.path )
                this._path.path.filter( 
                    field => { 
                        super.find( field ).classList.add('matrix__field--path') 
                    }
                )
            else 
                this.forceRefresh()    
            
            }
            
        super.start.classList.add('matrix__field--start')

        return this._path
    }

    //// GAME BASIC ////

    hit ( 
        field : PathNode | Position 
    ) : void {
        super.borders[field.y][field.x] = 0
        const currentField = super.find( field )
        currentField.reset()
        currentField.ball = { color : -1 }

    }

    move ( 
        field : PathNode 
    ) : boolean {
        if ( this._path.path ) {

            if ( !this._timeInterval ){
                this._timeInterval = setInterval( this.timer, 1000)
            }

            const start = super.start
            super.borders[start.y][start.x] = 0
            
            super.borders[field.y][field.x] = -1

            super.fields[field.y][field.x].ball = { ...super.fields[start.y][start.x].ball }
            super.fields[start.y][start.x].ball = {
                color : -1
            }

            super.end = field
            //// call checking functions ////

            return true
        } else 
            return false
    }

    @log
    drawBalls ( 
        count : number = defaults.maxBorders 
    ) : BallProps[] {

        const result : BallProps[] = []

        for (let i = 0; i < count ; i++) {
            result.push({
                color : getRandom(0, defaults.colors.length )
            })
        }

        this._drawedBalls = result

        return result
    }
    
    @popOut
    protected isAnyCrossSection ( 
        drawedBalls : Position[] = []
    ) : PathNode[] {
        let points : number | boolean = 0

        let result : PathNode []= []
        let positionResult : Position[] = []
        const balls : PathNode[] = drawedBalls.map( pos => super.find( pos ) )
        balls.push( this.end )

        console.log()

        const { allSides : sides } = defaults
        let index = 0

        for ( const ball of balls ){
            index++

            if ( ball )
            for ( let j = 0; j < sides.length / 2; j++) {
                
                console.log("sides:", j, (j + sides.length / 2 ) % sides.length)

                const checked : PathNode[] = [ 
                    ...this.checkLine( 
                        ball,
                        sides[j],
                        ball.color
                    ),
                    ...this.checkLine( 
                        ball,
                        sides[ ( j + sides.length / 2 ) % sides.length],
                        ball.color
                    ),
                    ball
                ]
                
                if ( checked.length >= 5 ) {
                    console.warn('wincyj')
                    // for (const field of checked ){
                    //     console.log('x',field.x,'y', field.y)
                    //     field.html.style.background = defaults.colors[ index ]
                    // }

                    checked.filter( node => positionResult.push(node.position) )

                    // result = [ ...result, ...checked ]

                }

                console.log('checkeeed',checked)
                
            }

        }

        // this.drawed.filter( pos => {console.log(pos)} )

        // const allNewBalls : PathNode[] = this.drawed.map( position => {
        //     return super.find( position )
        // } )

        const positionSet = new Set ( positionResult.map( position => JSON.stringify(position) ) )
        // console.log(positionSet)
        result = Array.from( positionSet ).map( position => this.find( JSON.parse(position) ) )

        // console.log("no repeats result" , result)

        this._checkedNodes = result

        return result
    }

    protected checkLine ( 
        node : PathNode,
        direction : Position,
        color : number
    ) : PathNode[] {    

        const shiftedPosition : Position = {
            x : +node.x + direction.x,
            y : +node.y + direction.y
        }

        if ( 
            this.isOnBoard( shiftedPosition ) &&
            this.isBorder( shiftedPosition )
        ) {
            const currentNode : PathNode = this.find( shiftedPosition )
            if ( currentNode.color == color ) {
                console.log( 'colorki : ', currentNode.color, color)

                return [ currentNode, ...this.checkLine( currentNode, direction, color ) ]
            } else {
                //// raczej nic tu nie trzeba ////
                // return [ currentNode ]
            }
        }

        return []
    }

    public getFreeFieldsPositions () : Position[] {

        const freePositions : Position[] = []

        for (let i in this.borders)
            for (let j in this.borders[i])
                if ( this.borders[i][j] == 0 ) {
                    console.log('fp',i, j)
                    freePositions.push({
                        x : +j,
                        y : +i
                    })
                }
        
        return freePositions
    }  

    protected countFreeFields () : number {
        let result : number = 0
        for (const row of this.borders)
            for (const value of row)
                if (value == 0)
                    result++

        console.table(this.borders)

        return result
    }

    public gameOver () : void {
        //// GAME OVER ////
        document.getElementById('overlay').style.pointerEvents = "all"
        const gameOver : HTMLElement = document.getElementById('gameover')
        
        clearInterval( this._timeInterval )
        this._timeInterval = undefined

        gameOver.className = 'gameover--show'
        // console.log('i tu powinno działać',1)

        document.getElementById('gameover__points').innerHTML = `${this.points}`
        document.getElementById('gameover__time').innerHTML = `${ this.convert() }`
        this.time = 0
    }

    @time
    private convert() {
        return this._time
    }
    
    @time @log
    protected timer ( ) : number | string{
        this._time++

        console.log(this._time)
        return this._time
    }

    // @log
    public generateNewBalls ( 
        count : number = defaults.maxBorders,
        isTimeout : boolean = true
    ) : void {
        
        // const freeFields : number = this.countFreeFields()

        // const freeFields : PathNode[] = this.getFreeFieldsPositions().map( position => this.find(position) )
        const freeFields : Position[] = this.getFreeFieldsPositions()


        console.log(freeFields, 'free fields')

        //// NEW WAY ////

        let crossections : PathNode[] = []

        /// checking if there's a crossections ///
        
        crossections = this.isAnyCrossSection()

        for (const ball of crossections){
            console.log('pilka',ball)
            ball.classList.add('matrix__field--matched')
        }

        if ( isTimeout ){
            setTimeout(() => {
                console.log('timeout 316')
                this._timeoutedSelectMatched(
                    count,
                    crossections,
                    freeFields,
                    isTimeout
                )                
            }, 500);
        } else {
            this._timeoutedSelectMatched(
                count,
                crossections,
                freeFields,
                isTimeout
            )
        }

    }

    private _timeoutedSelectMatched( 
        count : number,
        crossections : PathNode[],
        freeFields : Position[],
        isTimeout : boolean
    ) : TimeoutedParams {

        let balls : Position[] = []

        if ( freeFields.length > 3 ) {
            for (const ball of this._drawedBalls) {
                const index : number = getRandom(0, freeFields.length)
                const position : Position = { ...freeFields[index] }
                
                super.find( position ).ball = ball
                
                balls.push( position )

                this.borders[position.y][position.x] = -1
                console.log(position.x, position.y, 'balls 301')
                freeFields.splice(index, 1)
            }

        }

        crossections = this.isAnyCrossSection(balls)

        for (const ball of crossections){
            console.log('pilka',ball)
            ball.classList.add('matrix__field--matched')
        }

        if ( isTimeout ){
            setTimeout(() => {
                console.log('timeout 316')
                this._timeoutedHitBall(
                    count,
                    crossections,
                    freeFields
                )                
            }, 500);
        } else{
            this._timeoutedHitBall(
                count,
                crossections,
                freeFields
            )
        }

        return;
    }

    @log
    private _timeoutedHitBall( 
        count : number,
        crossections : PathNode[],
        freeFields : Position[]
    ) : number {
        for (const field of crossections) {
            this.hit(field)
        }


        /// refreshing ///
        this.resetBorders()

        this.points += crossections.length
        
        if ( freeFields.length > 3 ){
            console.log(
                this.drawBalls( count )
            )
    
            this.stage++
        } else {
            ('no i przegrałeś')
            this.gameOver()
        }

        this.isGameStopped = false
        console.log('pkt',this.points)
        return this.points
    }

    //// VISUAL EFFECTS ////

    forceRefresh ( ) : void {
        for (const row of super.fields)
            for (const field of row)
                field.reset()
        
    }

    //// BOOLS ////

    checkNeighbours ( 
        node : PathNode 
    ) : boolean {
        const neighbours = [
            { x : 0,    y : -1  },
            { x : 1,    y : 0   },
            { x : 0,    y : 1   },
            { x : -1,   y : 0   }
        ]


        for ( const { x, y } of neighbours) {
            const pos : Position = {
                y : +node.y + y,
                x : +node.x + x
            }

            if ( super.isOnBoard( pos ) )
                if ( !super.fields[ pos.y ][ pos.x ].isBorder )
                    return true
        }

        return false
    }

    //// SETTERS ////
    // @log

    set path ( path : PathResult ) {
        this._path = path
    }

    set points ( points : number ) {
        this._points = points
    }

    set start ( start : PathNode ) {
        if ( super.start )
            super.start.classList.remove('matrix__field--start')
        super.start = start
        if ( super.start )
            super.start.classList.add('matrix__field--start')
    }

    set end ( end : PathNode ) {
        super.end = end
    }

    set onGameStopped ( callback : CallbackFunc ){
        this._onGameStopped = callback
    }

    set isGameStopped( v : boolean ){
        this._onGameStopped( v )
        this._isStopped = v
    }

    set time ( v : number ){
        if (v == 0){
            
            clearInterval( this._timeInterval )
            this._timeInterval = undefined
        }
        this._time = v
    }
    
    //// GETTERS ////
    get start () { return super.start }
    get end ( ) { return super.end }

    get points ( ) { return this._points }
    get time ( ) { return this._time }

    get path ( ) { return this._path }
    get drawed ( ) { return this._drawedBalls }
    get matched ( ) { return this._matchedNodes } 

    get isGameStopped () { return this._isStopped }
}
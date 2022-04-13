console.log('loaded : index.ts')

import Board from '../game/Board'
import defaults from '../defaults'
import PathNode from '../pathfind/Node'
import { compareObj } from '../voids'

//// MAIN VOIDS ////

const { 
    generateBorderMap,
    resetBorders,
    generateRandomBorders
} = defaults.voids


//// SETUP ////

const { 
    size,
    maxBorders 
} = defaults

const borders  : number[][] = generateBorderMap( size.x, size.y )
const board : Board = new Board({
    width : size.x,
    height : size.y,
    generateHtml : true,
    borders : borders
})

let isClicked : boolean = false

document.addEventListener( 'DOMContentLoaded' , () => {
    document.getElementById('board').appendChild(
        board.html
    )
    
    board.onGameStopped = isStopped => {
        // if (isStopped) {
        //     board.html.style.pointerEvents = 'none'
        // } else {
        //     board.html.style.pointerEvents = ''
        // }
        console.log('isStopped',isStopped)
    }

    board.html.classList.add('matrix--hide-field-info')
    board.drawBalls()

    nextStage ( false )
    
    board.html.addEventListener('mouseleave', e => {
        if ( !board.isGameStopped )
        board.forceRefresh()
        board.start = board.start
    })

    board.addEventListener( 'mouseenter', ( e, that ) => {
        console.log(that.position)

        if (isClicked) {
            const { path, checked } = board.findPath ( that )
            // board.start = board.start
        }
    })

    board.addEventListener( 'click', ( e, that ) => {
        console.log(board.isGameStopped)
        if (!board.isGameStopped) {

            if ( that.isBorder ) {
                /// balls ///
                console.log(board.start, that)
                if ( !compareObj(board.start, that) ) {
                    
                    if ( board.checkNeighbours ( that ) ) {
    
                        board.start = that
                        isClicked = true
                    }
                
                } else {
                
                    if ( !isClicked ) {
                        
                        isClicked = false
                    } else {
    
                        console.log('ej no siema mordo')
                        board.start = undefined
                        isClicked = false
                    }
                }
    
            } else {
                /// empty fields ///
    
                if ( isClicked && board.move(that) ) {
                    
                    // board.move( that )
                    nextStage()
                }
                board.start = undefined
                isClicked = false
    
            }
            stylizeClick( isClicked )
        }
    })

    const showFieldInfo : HTMLInputElement = document.getElementById('show-field-info') as HTMLInputElement
    const showFieldInfoBtn : HTMLButtonElement = document.getElementById('show-field-info-btn') as HTMLButtonElement

    showFieldInfoBtn.addEventListener('click', e => {
        console.log(e.target)
        const val : string = showFieldInfo.getAttribute('value')
        // e.target

        const isTrue : boolean = val == "true"
        const attr : string = isTrue ? "false" : "true"

        showFieldInfo.checked = isTrue
        if ( isTrue ) {
            board.html.classList.add('matrix--hide-field-info')
        } else {
            board.html.classList.remove('matrix--hide-field-info')
        }

        showFieldInfo.setAttribute('value', attr)

        // showFieldInfo.setAttribute('value')
    })

    document.getElementById('replay').addEventListener('click', e => {
        //// reset and replay ////
        const gameOver = document.getElementById('gameover')

        // gameOver.classList.remove('gameover--show')
        // gameOver.classList.add('gameover--hide')

        gameOver.className = 'gameover--hide'
        document.getElementById('overlay').style.pointerEvents = ''

        resetGame()
    })

    document.getElementById('reset-game').addEventListener('click', resetGame)

})


//// LOCAL VOIDS ////

const resetGame = () : void => {
    resetBorders(borders)
    board.reset()

    board.points = 0
    board.stage = 0
    board.path = {
        path : [],
        checked : []
    }
    
    board.time = 0
    
    document.getElementById('points').innerHTML = `${0}`
    document.getElementById('time').innerHTML = `00:00:00`
    board.drawBalls()
    nextStage(false)
}

const nextStage = ( shift : boolean = true ) : void => {

    /// shifting ball ///
    // if ( shift ) {

    // }

    /// generate new balls ///
    // generateRandomBorders( borders, maxBorders )

    // /// refreshing ///
    // board.resetBorders()
    if ( shift )
        board.isGameStopped = true
    else
        board.isGameStopped = false

    board.generateNewBalls(undefined, shift)

    const path = board.path.path.map( pos => {
        console.log(pos)

        const field = board.find( pos )
        
        field.classList.add( 'matrix__field--dimmed-path' )

        return field
    })

    

    if ( board.start ){
        board.start.classList.add( 'matrix__field--dimmed-path' )
        path.push(  board.start  )
    }

    const currentStage = JSON.parse(`${board.stage}`)
    // console.log(currentStage)


    let time = Date.now()

    setTimeout( () => {
        if ( currentStage == board.stage ){
            path.filter( field => {
                field.classList.remove('matrix__field--dimmed-path')
            } )

            board.isGameStopped = false
            console.log( Date.now() - time, 'time' )
        }

        // board.isGameStopped = false
    }, 1000)

    stylizeClick(isClicked)

}

const restyle = ( style : string, html : HTMLStyleElement) : void => {
    if (!html)
        document.getElementById('style').innerHTML = style
    else
        html.innerHTML = style
}

const stylizeClick = ( isClicked : boolean ) : void => {
    
    restyle( 
        `
            .matrix__field {
                ${ isClicked 
                    ? 'cursor:pointer'
                    : ''
                }
            }

            .matrix__field--border {
                ${ isClicked 
                    ? 'cursor:default'
                    : 'cursor:pointer;'
                }
            }
        `, 
        document.getElementById('cursor-style') as HTMLStyleElement
    )
}
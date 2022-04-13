console.log('loaded : pathfind.ts')

import Matrix from '../pathfind/Matrix'


//// EXAMPLE UTILITIES ////

const generateBorderMap = (x : number, y : number) : number[][] => {
    const borderMap = []

    for ( let i : number = 0; i < y; i++ ){
        const rows = []
        for (let j : number = 0; j < x ; j++)
            rows.push(0)
        borderMap.push(rows)
    }

    return borderMap
}

const resetBorders = ( arr : any[] ) : void => {
    for ( let i in arr ) {
        for (let j in arr[i])
            arr[i][j] = 0
    }
}

const generateRandomBorders = ( arr : number[][], maxBordes : number ) : void => {
    const { length : height } = arr
    const { length : width } = arr[0]

    for ( let i = 0; i < maxBordes; i++ ) 
        arr[ getRandom( 0, height ) ][ getRandom( 0, width ) ] = -1

}

const getRandom = ( min : number, max : number ) : number => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor( Math.random ( ) * (max - min ) ) + min
}


const size : number = 7
const randomCount : number = 12

const borders = generateBorderMap ( size, size )
generateRandomBorders ( borders, randomCount )

console.table(borders)

const matrix : Matrix = new Matrix({
    width : size,
    height : size,
    generateHtml : true,
    borders : borders,
})

let step    : number = 1
let minStep : number = 1
let maxStep : number = 3

let isAlreadyClicked : boolean = false

document.addEventListener( 'DOMContentLoaded', () => {
    console.log(matrix.html)
    document.getElementById('board').appendChild(matrix.html)


    matrix.addEventListener('click', ( e, that ) => {
        console.log(that.x, that.y)
        console.log(step)

        console.log(that)

        
        if ( !isAlreadyClicked && !that.isBorder ) {
            
            // isAlreadyClicked = true
            
            switch (step) {
                case 1:
                    matrix.start = that
                    that.classList.add('matrix__field--start')
                    step = 2
                    break;
                case 2:
                    matrix.end = that
                    that.classList.add('matrix__field--end')

                    // const { checked, path } = matrix.findPath()

                    const { path , checked } = matrix.findPath()
                    console.log(path)

                    try {
                        for (const field of checked){
                            field.classList.add('matrix__field--checked')
                        }
        
                        for (let i in path){
                            
                            const node = matrix.find(path[i])
                            node.classList.add('matrix__field--path')
                        }
                        
                    } catch (error) {
                        console.warn(error)
                    }
    

                    step = 3

                    break;
                case 3:

                    resetBorders( borders )
                    generateRandomBorders( borders, randomCount )

                    matrix.borders = borders
                    matrix.reset()

                    step = 1

                    break;
                
                default:

                    // step = 1
                    break;
            }
            isAlreadyClicked = false

            // step = step >= maxStep ? minStep : step + 1
        }

    })

})
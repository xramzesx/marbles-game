import { getRandom } from './voids'
import Position, { StringArray } from './pathfind/Interfaces'
//// CONFIGURATION PROPS WITH VOIDS ////


class Voids {
    public generateBorderMap (x : number, y : number) : number[][] {
        const borderMap = []
    
        for ( let i : number = 0; i < y; i++ ){
            const rows = []
            for (let j : number = 0; j < x ; j++)
                rows.push(0)
            borderMap.push(rows)
        }
    
        return borderMap
    }
    public resetBorders ( arr : any[] ) : void {
        for ( let i in arr ) {
            for (let j in arr[i])
                arr[i][j] = 0
        }
    }
    public generateRandomBorders ( 
        arr : number[][], 
        maxBordes : number = 3 
    ) : void {
        const { length : height } = arr
        const { length : width } = arr[0]
    
        for ( let i = 0; i < maxBordes; i++ ) {
            let x : number
            let y : number

            let repeats = 0

            do {
                if (repeats > 5)
                    break
                y = getRandom( 0, height )
                x = getRandom( 0, width )
            } while ( arr[ y ][ x ] == -1 )

            if (repeats > 5) {
                //// add some kind of validation
                break
            }
            arr[ y ][ x ] = -1
        }
    
    }
}

export default class defaults {
    public static readonly size : Position ={
        x : 9,
        y : 9
    }
    public static readonly maxBorders : number = 3

    public static readonly colors : StringArray = [
        'red',
        'darkgreen',
        'papayawhip',
        'blue',
        'yellow',
        'purple',
        '#111532'
    ]

    public static readonly allSides : Position[] = [
        { x : 0,  y : 1  },
        { x : 1,  y : 1  },
        { x : 1,  y : 0  },
        { x : 1,  y : -1 },
        { x : 0,  y : -1 },
        { x : -1, y : -1 },
        { x : -1, y : 0  },
        { x : -1, y : 1  },
    ]

    public static voids : Voids = new Voids
}



// export default {
//     size : {
//         x : 9,
//         y : 9
//     },

//     /// max borders and max ball count to draw
//     maxBorders : 3,

//     colors : [
//         'red',
//         'darkgreen',
//         'papayawhip',
//         'blue',
//         'yellow',
//         'purple',
//         '#111532'
//     ],

//     allSides : [
//         { x : 0,  y : 1  },
//         { x : 1,  y : 1  },
//         { x : 1,  y : 0  },
//         { x : 1,  y : -1 },
//         { x : 0,  y : -1 },
//         { x : -1, y : -1 },
//         { x : -1, y : 0  },
//         { x : -1, y : 1  },
//     ],

//     voids : {        
//         generateBorderMap : (x : number, y : number) : number[][] => {
//             const borderMap = []
        
//             for ( let i : number = 0; i < y; i++ ){
//                 const rows = []
//                 for (let j : number = 0; j < x ; j++)
//                     rows.push(0)
//                 borderMap.push(rows)
//             }
        
//             return borderMap
//         },
//         resetBorders : ( arr : any[] ) : void => {
//             for ( let i in arr ) {
//                 for (let j in arr[i])
//                     arr[i][j] = 0
//             }
//         },
//         generateRandomBorders : ( arr : number[][], maxBordes : number = 3 ) : void => {
//             const { length : height } = arr
//             const { length : width } = arr[0]
        
//             for ( let i = 0; i < maxBordes; i++ ) {
//                 let x : number
//                 let y : number

//                 let repeats = 0

//                 do {
//                     if (repeats > 5)
//                         break
//                     y = getRandom( 0, height )
//                     x = getRandom( 0, width )
//                 } while ( arr[ y ][ x ] == -1 )

//                 if (repeats > 5) {
//                     //// add some kind of validation
//                     break
//                 }
//                 arr[ y ][ x ] = -1
//             }
        
//         },

        
//     },
// }
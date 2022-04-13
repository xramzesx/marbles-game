console.log ( 'loaded : voids.ts' )

export const getRandom = ( min : number, max : number ) : number => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor( Math.random ( ) * (max - min ) ) + min
}

export const reduceArr = (arr : any, item : any) => {
    const index = arr.indexOf(item)
    // console.log( 'index', index)
    if (index > -1 )
        arr.splice( index, 1 )
    return arr
}

export const compareObj = (
    first : any,
    second : any 
) : boolean => {
    return JSON.stringify(first) == JSON.stringify(second)
}

export const join = ( first : any[], second : any[] ) => {
    const result : any[] = []

    first.filter( v => result.push(v) )
    second.filter( v => result.push(v) )

    return result
}

export const cloneObj = (obj : any) => JSON.parse(JSON.stringify( obj ))
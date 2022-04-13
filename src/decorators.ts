import defaults from "./defaults"
import { StringArray } from "./pathfind/Interfaces"
import { getRandom } from "./voids"

let current_time : string = "00:00:00"

export function log ( 
    target : any, 
    name : string, 
    descriptor : PropertyDescriptor 
) {
    const originalMethod = descriptor.value
    descriptor.value = function ( ...args : any[] ) {
        const result = originalMethod.apply( this, args )
        
        if ( name == 'drawBalls' ){
            const drawedBalls : HTMLDivElement = document.getElementById ('drawed-balls') as HTMLDivElement
            drawedBalls.innerHTML = ""
    
            console.log(result)
    
            for ( const { color : col } of result ) {
    
                const ball : HTMLDivElement = document.createElement('div')
                const color : string = defaults.colors[ col ]
    
                ball.classList.add('matrix__ball--show')
                ball.style.backgroundColor = color
                ball.style.filter = `drop-shadow( .2rem .2rem 0 ${color})`
    
                drawedBalls.appendChild( ball )
            }
    
            
        }
        
        if ( name == '_timeoutedHitBall'){
            document.getElementById('points').innerHTML = `${result}`
        }
        
        if ( name == 'timer' ) {
            document.getElementById('time').innerHTML = `${current_time}`
        }

        // console.log(`Wywoluje : ${name}, oto rezultat ${result}`)
        return result
    }
}

const stonogaIco : HTMLImageElement = document.createElement('img') as HTMLImageElement
stonogaIco.src = './favicon.png'
stonogaIco.classList.add('icon')

const mockers : StringArray = [
    'bruh',
    'no i co robisz cieniasie',
    'postarałbyś się',
    'boże co za gość',
    'no lepiej tą kulke przesuń no',
    stonogaIco.outerHTML
]

let canPopOut = true

export function popOut ( 
    target : any, 
    name : string, 
    descriptor : PropertyDescriptor 
) {
    const originalMethod = descriptor.value
    descriptor.value = function ( ...args : any[] ) {
        const result = originalMethod.apply( this, args )

        const popOutDiv : HTMLDivElement = document.createElement('div') as HTMLDivElement
        
        popOutDiv.classList.add('overlay__pop-out')

        if ( result.length ){
            popOutDiv.innerHTML = `oj +${result.length} byczq`
        } else {
            popOutDiv.innerHTML = mockers[getRandom( 0, mockers.length )]
        }
    
        if ( canPopOut || result.length ){
            document.getElementById('pop-out').append(popOutDiv)
            canPopOut = false
            setTimeout(() => {
                canPopOut = true
            }, 1000);
        }
        setTimeout(() => {
            popOutDiv.remove()
        }, 2000);

        return result
    }
}

export function time (
    target : any,
    name : string, 
    descriptor : PropertyDescriptor
) {
    const originalMethod = descriptor.value
    descriptor.value = function ( ...args : any[] ) {
        const result : number = originalMethod.apply(this, args)

        console.log(result,'dasdas')
        let sec_num : string | number = parseInt(`${result}`, 10); // don't forget the second param
        let hours   : string | number = Math.floor(sec_num / 3600);
        let minutes : string | number = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds : string | number = sec_num - (hours * 3600) - (minutes * 60);
    
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        current_time= hours+':'+minutes+':'+seconds;

        // current_time = pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) + ',' + pad(milliseconds, 3);
        return current_time
        // return timeString
    }

}


export function mark ( 
    target : any, 
    name : string, 
    descriptor : PropertyDescriptor 
) {
    const originalMethod = descriptor.value
    descriptor.value = function ( ...args : any[] ) {
        const result : any = originalMethod.apply( this, args )

        if ( name == 'isAnyCrossSection' ) {

        }

        return result
    }
}
import changeQuote from './module/quote/change.js'
import changeWallpaper from './module/wallpaper/change.js'
import changeInformation from './module/information/change.js'

window.addEventListener('load', event => {
    changeQuote()
    changeWallpaper()
    changeInformation()
})

{
    let x = 0
    const quote = document.querySelector('#quote')
    quote.addEventListener('touchstart', event => {
        x = event.pageX
    })
    window.addEventListener('touchend', event => {
        if (event.pageX > x && (event.pageX - x) / window.innerWidth > .1) {
            changeQuote()
        }
    })
}
    
window.addEventListener('click', event => {
    const x = event.x / window.innerWidth
    const y = event.y / window.innerHeight
    if (x > .9 && y < .33) {
        changeWallpaper()
    }
    if (x > .9 && y > .33 && y < .66) {
        changeQuote()
    }
})

window.addEventListener('keypress', event => {
    switch (event.key) {
        default:
            alert(`Try to use shortcuts:\nChange the wallpaper by pressing key 'w'.\nChange the quote by pressing key 'q'.`)
            break
        case 'w':
            changeWallpaper()
            break
        case 'q':
            changeQuote()
            break
    }
})
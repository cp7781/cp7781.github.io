import changeQuote from './module/quote/change.js'
import changeWallpaper from './module/wallpaper/change.js'

window.addEventListener('load', event => {
    changeQuote()
    changeWallpaper()
})

window.addEventListener('click', event => {
    const x = event.x / window.innerWidth
    const y = event.y / window.innerHeight
    if (x < .32 && y < .32) {
        changeWallpaper()
    }
    if (x > .68 && y < .32) {
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
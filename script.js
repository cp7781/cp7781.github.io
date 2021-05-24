import changeQuote from './module/quote/change.js'
import changeWallpaper from './module/wallpaper/change.js'
import changeInformation from './module/information/change.js'

window.addEventListener('load', event => {
    changeQuote()
    changeWallpaper()
    changeInformation()
})

document.querySelector('#changeWallpaper').addEventListener('click', event => {
    changeWallpaper()
    event.stopPropagation()
})
document.querySelector('#changeQuote').addEventListener('click', event => {
    changeQuote()
    event.stopPropagation()
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
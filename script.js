import queryQuote from './module/quote/query.js'
import queryWallpaper from './module/wallpaper/query.js'
import changeDateTime from './module/datetime/change.js'
import queryWeather from './module/weather/query.js'

window.addEventListener('load', event => {
    queryQuote()
    queryWallpaper()
    changeDateTime()
    queryWeather()
})

document.querySelector('#changeWallpaper').addEventListener('click', event => {
    queryWallpaper()
    event.stopPropagation()
})
document.querySelector('#changeQuote').addEventListener('click', event => {
    queryQuote()
    event.stopPropagation()
})

window.addEventListener('keyup', event => {
    switch (event.key) {
        case 'w':
            queryWallpaper()
            break
        case 'q':
            queryQuote()
            break
        case 'l':
            document.querySelector('#location').focus()
            break
        case 'Tab':
        case 'Shift':
        case 'Control':
        case 'Alt':
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'ArrowDown':
            /* keyboard navigation */
            break
        default:
            alert(`Try to use shortcuts:\nChange the wallpaper by pressing key 'w'.\nChange the quote by pressing key 'q'.\n\nThe location above the weather informations can be edited, either by clicking or pressing key 'l'`)
            break
    }
})
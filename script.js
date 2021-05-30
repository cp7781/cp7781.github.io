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

window.addEventListener('keypress', event => {
    switch (event.key) {
        default:
            alert(`Try to use shortcuts:\nChange the wallpaper by pressing key 'w'.\nChange the quote by pressing key 'q'.`)
            break
        case 'w':
            queryWallpaper()
            break
        case 'q':
            queryQuote()
            break
    }
})
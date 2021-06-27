import { default as queryQuote, requestQuote } from './module/quote/query.js'
import { default as queryWallpaper, requestWallpaper } from './module/wallpaper/query.js'
import changeDateTime from './module/datetime/change.js'
import queryWeather from './module/weather/query.js'

window.addEventListener('load', event => {
    queryQuote()
    queryWallpaper()
    changeDateTime()
    queryWeather()
})

document.querySelector('#changeWallpaper').addEventListener('click', event => {
    requestWallpaper()
    event.stopPropagation()
})
document.querySelector('#changeQuote').addEventListener('click', event => {
    requestQuote()
    event.stopPropagation()
})

window.addEventListener('keyup', event => {
    if (!event.ctrlKey && !event.altKey && !event.shiftKey && event.key >= 'a' && event.key <= 'z') {
        switch (event.key) {
            case 'w':
                requestWallpaper()
                break
            case 'q':
                requestQuote()
                break
            case 'e':
                document.querySelector('#location').focus()
                break
            default:
                alert(`Try to use shortcuts:\n\nChange the wallpaper by pressing W.\n\nChange the quote by pressing Q.\n\nIf weather information service is available, the location can be edited by pressing E.`)
                break
        }
    } else if (event.key == 'Escape') {
        event.target.blur()
    }
})

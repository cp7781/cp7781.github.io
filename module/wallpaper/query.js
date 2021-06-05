import { getWallpaper, putWallpaper } from '../database/interface.js'

/*
query data from Lorem Picsum
more information on how to use: https://picsum.photos/

note: Lorem Picsum currently uses images from https://unsplash.com/, more informations about the API at https://unsplash.com/developers
*/
export default function () {
    getWallpaper(1, wallpaper => {
        if (wallpaper) {
            changeUserInterface(window.URL.createObjectURL(wallpaper.image))
        } else {
            requestWallpaper()
        }
    })
}

export function requestWallpaper() {
    const url = `https://picsum.photos/${screen.width}/${screen.height}?random=${Math.round(Math.random() * Number.MAX_SAFE_INTEGER)}.webp`
    const request = new XMLHttpRequest()
    request.responseType = 'blob'
    request.addEventListener('load', event => {
        const response = event.target.response
        putWallpaper({
            identifier: 1,
            image: response
        }, () => {
            getWallpaper(1, wallpaper => {
                changeUserInterface(window.URL.createObjectURL(wallpaper.image))
            })
        })
    })
    request.addEventListener('error', event => {
        console.error(`could not query ${url}`)
    })
    request.open('GET', url)
    request.send()
}

function changeUserInterface(url) {
    document.querySelector('body').style.backgroundImage = `url('${url}')`
}
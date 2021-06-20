import { getLocation, putLocation } from '../database/interface.js'

/*
query information from wttr.in
more information on how to use: https://github.com/chubin/wttr.in
*/
export default function () {
    const inputLocation = document.querySelector('#location')
    getLocation(1, location => {
        if (location) {
            inputLocation.value = location.name
            change()
        } else {
            change()
        }
    })
    window.setInterval(() => {
        change()
    }, 1800000)
    inputLocation.addEventListener('change', event => {
        change()
    })
    inputLocation.addEventListener('keyup', event => {
        if (event.key == 'Escape') {
            event.target.blur()
        }
        event.stopPropagation()
    })
}

function change() {
    const inputLocation = document.querySelector('#location')
    let location = inputLocation.value
    if (location) {
        putLocation({ identifier: 1, name: location })
    }
    requestWeather(location)
}

function requestWeather(location) {
    const url = `https://wttr.in/${encodeURIComponent(location)}?format=j1`
    const request = new XMLHttpRequest()
    request.responseType = 'json'
    request.addEventListener('load', event => {
        const response = event.target.response
        if (!response) {
            changeUserInterface(null)
            return
        }
        if (!location) {
            location = response.nearest_area[0].areaName[0].value
            putLocation({ identifier: 1, name: location })
        }
        const currentCondition = response.current_condition[0]
        changeUserInterface({
            location: location,
            temperature: currentCondition.temp_C,
            pressure: currentCondition.pressure,
            humidity: currentCondition.humidity
        })
    })
    request.addEventListener('error', event => {
        console.error(`could not query ${url}`)
    })
    request.open('GET', url)
    request.send()
}

function changeUserInterface(weather) {
    const location = document.querySelector('#location')
    if (weather) {
        location.style.visibility = 'visible';
        location.value = weather.location
        document.querySelector('#weather').innerHTML = `<a href="https://wttr.in/${encodeURIComponent(weather.location)}">temperature: ${weather.temperature} °C<br>pressure: ${weather.pressure} hPa<br>humidity: ${weather.humidity} %</a>`
    } else {
        location.style.visibility = 'hidden';
    }
}
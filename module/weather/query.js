/*
query information from wttr.in
more information on how to use: https://github.com/chubin/wttr.in
*/
export default function () {
    change()
    window.setInterval(() => {
        change()
    }, 1800000)
    document.querySelector('#location').addEventListener('change', event => {
        change()
    })
}

function change() {
    const location = document.querySelector('#location').value
    const url = `https://wttr.in/${encodeURIComponent(location)}?format=j1`
    const request = new XMLHttpRequest()
    request.responseType = 'json'
    request.addEventListener('load', event => {
        const areaName = event.target.response?.nearest_area[0]?.areaName[0].value
        const currentCondition = event.target.response?.current_condition[0]
        if (areaName && currentCondition) {
            document.querySelector('#location').value = areaName
            document.querySelector('#weather').innerHTML = `<a href="https://wttr.in/${encodeURIComponent(location)}">temperature: ${currentCondition.temp_C} °C<br>pressure: ${currentCondition.pressure} hPa<br>humidity: ${currentCondition.humidity} %</a>`
        } else {
            console.error(`got an unexpected response from ${url}`)
        }
    })
    request.addEventListener('error', event => {
        console.error(`could not query ${url}`)
    })
    request.open('GET', url)
    request.send()
}
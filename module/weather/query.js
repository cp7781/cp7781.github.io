/*
query information from wttr.in
more information on how to use: https://github.com/chubin/wttr.in
*/
export default function () {
    change()
    window.setInterval(() => {
        change()
    }, 900000)
}

function change() {
    const url = `https://wttr.in/?format=j1`
    const request = new XMLHttpRequest()
    request.responseType = 'json'
    request.addEventListener('load', event => {
        const currentCondition = event.target.response?.current_condition[0]
        if (currentCondition) {
            document.querySelector('#weather').innerHTML = `temperature: ${currentCondition.temp_C} °C<br>pressure: ${currentCondition.pressure} hPa<br>humidity: ${currentCondition.humidity} %`
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
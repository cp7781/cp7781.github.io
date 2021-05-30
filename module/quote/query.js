/*
query information from Quote Garden
more information on how to use: https://github.com/pprathameshmore/QuoteGarden
*/
export default function () {
    const url = 'https://quote-garden.herokuapp.com/api/v3/quotes/random'
    const request = new XMLHttpRequest()
    request.responseType = 'json'
    request.addEventListener('load', event => {
        const data = event.target.response?.data[0]
        if (data) {
            const quote = document.querySelector('#quote')
            quote.innerHTML = `${data.quoteText}<br># <a href="https://www.google.com/search?q=${encodeURIComponent(data.quoteAuthor)}">${data.quoteAuthor}</a>`
            quote.style.visibility = 'visible'
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

/*
query information from Quote Garden
more information on how to use: https://github.com/pprathameshmore/QuoteGarden
*/
export default function () {
    const request = new XMLHttpRequest()
    request.responseType = 'json'
    request.addEventListener('load', event => {
        const data = event.target.response.data[0]
        const quote = document.querySelector('#quote')
        quote.innerHTML = `${data.quoteText}<br># <a href="https://www.google.com/search?q=${encodeURIComponent(data.quoteAuthor)}">${data.quoteAuthor}</a>`
        quote.style.visibility = 'visible';
    })
    request.open("GET", "https://quote-garden.herokuapp.com/api/v3/quotes/random")
    request.send()
}

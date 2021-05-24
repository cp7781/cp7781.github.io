/*
query information from Quote Garden
more information on how to use: https://github.com/pprathameshmore/QuoteGarden
*/
export default function () {
    const request = new XMLHttpRequest()
    request.responseType = 'json'
    request.addEventListener('load', event => {
        const quote = event.target.response.data[0];
        document.querySelector('#quote').innerHTML = `${quote.quoteText}<br># ${quote.quoteAuthor}`
    })
    request.open("GET", "https://quote-garden.herokuapp.com/api/v3/quotes/random")
    request.send()
}

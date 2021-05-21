export default function () {
    document.querySelector('#quote').addEventListener('dblclick', event => changeQuote())
    changeQuote()
}

function changeQuote() {
    const request = new XMLHttpRequest()
    request.responseType = 'json'
    request.addEventListener('load', event => {
        const quote = event.target.response.data[0];
        document.querySelector('#quote').innerHTML = `${quote.quoteText} - ${quote.quoteAuthor}`
    })
    request.open("GET", "https://quote-garden.herokuapp.com/api/v3/quotes/random")
    request.send()
}

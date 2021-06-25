import { getQuote, putQuote } from '../database/interface.js'

/*
query information from Quote Garden
more information on how to use: https://github.com/pprathameshmore/QuoteGarden
*/
export default function () {
    getQuote(1, quote => {
        if (quote) {
            changeUserInterface(quote)
        } else {
            requestQuote()
        }
    })
}

export function requestQuote() {
    const url = 'https://quote-garden.herokuapp.com/api/v3/quotes/random'
    const request = new XMLHttpRequest()
    request.responseType = 'json'
    request.addEventListener('load', event => {
        const data = event.target.response?.data[0]
        if (data) {
            const quote = {
                identifier: 1,
                text: data.quoteText,
                author: data.quoteAuthor
            }
            putQuote(quote)
            changeUserInterface(quote)
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

function changeUserInterface(quote) {
    const divQuote = document.querySelector('#quote')
    divQuote.innerHTML = `<a href="https://translate.google.com/?text=${encodeURIComponent(quote.text)}" class="noDecoration">${quote.text}</a><br># <a href="https://www.google.com/search?q=${encodeURIComponent(quote.author)}" class="noDecoration">${quote.author}</a>`
    divQuote.style.visibility = 'visible'
}

import changeMessage from './module/changeMessage.js'
import paintBackground from './module/background/paint.js'
import drawSymbol from './module/drawSymbol.js'
import requestQuote from './module/requestQuote.js'

window.addEventListener('load', event => {
    changeMessage()
    paintBackground()
    drawSymbol()
    requestQuote()
})

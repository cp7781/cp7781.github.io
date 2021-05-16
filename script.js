import changeMessage from './modules/changeMessage.mjs'
import drawBackground from './modules/drawBackground.mjs'
import drawSymbol from './modules/drawSymbol.mjs'

window.addEventListener('load', event => {
    changeMessage()
    drawBackground()
    drawSymbol()
})

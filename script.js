import changeMessage from './modules/changeMessage.mjs'
import drawBackground from './modules/drawBackground.mjs'
import drawGlassPane from './modules/drawGlassPane.mjs'

window.addEventListener('load', event => {
    changeMessage()
    drawBackground()
    drawGlassPane()
})

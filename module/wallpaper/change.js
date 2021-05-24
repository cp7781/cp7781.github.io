/*
query data from Lorem Picsum
more information on how to use: https://picsum.photos/
*/
export default function () {
    document.querySelector('body').style.backgroundImage = `url('https://picsum.photos/${screen.width}/${screen.height}?random=${Math.round(Math.random() * Number.MAX_SAFE_INTEGER)}')`
}
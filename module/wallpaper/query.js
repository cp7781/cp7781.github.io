/*
query data from Lorem Picsum
more information on how to use: https://picsum.photos/

note: Lorem Picsum currently uses images from https://unsplash.com/, more informations about the API at https://unsplash.com/developers
*/
export default function () {
    document.querySelector('body').style.backgroundImage = `url('https://picsum.photos/${screen.width}/${screen.height}?random=${Math.round(Math.random() * Number.MAX_SAFE_INTEGER)}.webp')`
}
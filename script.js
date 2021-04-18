"use strict";

function change() {
    const timeout = 79;
    const message = document.getElementById('message');
    const text = message.textContent;
    const length = text.length;
    let index = 0;
    function changeMessage() {
        ++index;
        index %= length;
        message.innerHTML = text.substring(0, index) + text[index].toUpperCase() + text.substring(index + 1, length);
        window.setTimeout(changeMessage, timeout);
    }
    window.setTimeout(changeMessage, timeout);
};

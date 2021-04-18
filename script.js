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
        let changedText = text.substring(0, index);
        changedText += text[index].toUpperCase();
        changedText += text.substring(index + 1, length);
        message.innerHTML = changedText;
        window.setTimeout(changeMessage, timeout);
    }
    window.setTimeout(changeMessage, timeout);
};

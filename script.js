
"use strict";

function change() {
    let timeout = 79;
    let message = document.getElementById('message');
    let text = message.textContent;
    let length = text.length
    let index = 0;
    function changeMessage() {
        ++index;
        index %= length;
        let text2 = text.substring(0, index);
        text2 += text[index].toUpperCase();
        text2 += text.substring(index + 1, length);
        message.innerHTML = text2;
        window.setTimeout(changeMessage, timeout);
    }
    window.setTimeout(changeMessage, timeout);
};

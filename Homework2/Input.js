function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function initInput() {
    canvas.addEventListener('mousemove', function (evt) {
        window.mousePosition = getMousePos(canvas, evt);
    }, false);

    canvas.addEventListener('click', function (evt) {
        window.mousePosition = getMousePos(canvas, evt);
        console.log(window.mousePosition);
        instantWordSelect();
        detectObject();
        clicked = !clicked;
        // mouse click logic comes here. // Magic happens
    }, false);
}

// timed event that shows a word on the screen
function timedWordSelect() {
    setTimeout(function () {
        instantWordSelect();
    }, 3000);
}

// the event that shows a word on the screen
function instantWordSelect() {
    wordId = Math.floor(Math.random() * Math.floor(5));
    document.getElementById("wordContainer").innerHTML = words[wordId];
}

function detectObject() {
    //cast a ray to [window.mousePosition.x, window.mousePosition.y, 1]

    //

}
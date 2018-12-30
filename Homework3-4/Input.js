function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function initInput() {
    rightPressed = false;
    leftPressed = false;
    upPressed = false;
    downPressed = false;
    wPressed = false;
    sPressed = false;
    aPressed = false;
    dPressed = false;

    canvas.addEventListener('mousemove', function (evt) {
        window.mousePosition = getMousePos(canvas, evt);
    }, false);

    canvas.addEventListener('click', function (evt) {
        window.mousePosition = getMousePos(canvas, evt);
        document.getElementById("lightPos").innerHTML = window.light.position;
    }, false);

    //adding eventlisteners for key pressed and released
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    //key pressed event
    function keyDownHandler(event) {
        if (event.keyCode == 39) {
            rightPressed = true;
        }
        else if (event.keyCode == 37) {
            leftPressed = true;
        }
        if (event.keyCode == 40) {
            downPressed = true;
        }
        else if (event.keyCode == 38) {
            upPressed = true;
        }
        if (event.keyCode == 87) {
            wPressed = true;
        }
        else if (event.keyCode == 83) {
            sPressed = true;
        }
        if (event.keyCode == 65) {
            aPressed = true;
        }
        else if (event.keyCode == 68) {
            dPressed = true;
        }
    }

    //key released event
    function keyUpHandler(event) {
        if (event.keyCode == 39) {
            rightPressed = false;
        }
        else if (event.keyCode == 37) {
            leftPressed = false;
        }
        if (event.keyCode == 40) {
            downPressed = false;
        }
        else if (event.keyCode == 38) {
            upPressed = false;
        }
        if (event.keyCode == 87) {
            wPressed = false;
        }
        else if (event.keyCode == 83) {
            sPressed = false;
        }
        if (event.keyCode == 65) {
            aPressed = false;
        }
        else if (event.keyCode == 68) {
            dPressed = false;
        }
    }
}

//Move camera at update function
function positionLightWihtKeyboarInput() {
    if (rightPressed) {
        window.light.position[0] -= 0.1;
    }
    else if (leftPressed) {
        window.light.position[0] += 0.1;
    }
    else if (downPressed) {
        window.light.position[2] -= 0.1;
    }
    else if (upPressed) {
        window.light.position[2] += 0.1;
    }
    if (wPressed) {
        window.mainCamera.position[2] += 0.1;
    }
    else if (sPressed) {
        window.mainCamera.position[2] -= 0.1;
    }
    else if (aPressed) {
        window.mainCamera.position[0] += 0.1;
    }
    else if (dPressed) {
        window.mainCamera.position[0] -= 0.1;
    }
}
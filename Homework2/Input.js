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

    canvas.addEventListener('mousemove', function (evt) {
        window.mousePositionOnMove = getMousePos(canvas, evt);
    }, false);

    canvas.addEventListener('click', function (evt) {
        window.mousePosition = getMousePos(canvas, evt);
        console.log(window.mousePosition);
        instantWordSelect();
        detectObject();
        clicked = !clicked;
        // mouse click logic comes here. // Magic happens
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
    }
}

//Move camera at update function
function positionCameraWihtKeyboarInput() {
    if (rightPressed) {
        window.mainCamera.position[0] += 0.1;
        if (window.cameraPositionX > 100)
            window.cameraPositionX = 1;
    }
    else if (leftPressed) {
        window.mainCamera.position[0] -= 0.1;
        if (window.cameraPositionX < -100)
            window.cameraPositionX = -1;
    }
    else if (downPressed) {
        window.mainCamera.position[2] += 0.1;
    }
    else if (upPressed) {
        window.mainCamera.position[2] -= 0.1;
    }
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
    [csDirec, wsStart, wsDirec] = window.mainCamera.raycast(window.mousePosition.x, window.mousePosition.y, -1);

    //parse all the hit objects and get the nearest to camera
    //calculating a, b and c so that we can find at^2 + bt + c
    a = math.dot(wsDirec, wsDirec);

    // rBird = math.distance(window.bird.mesh.getMinimumVertexValues(), window.bird.mesh.getMaximumVertexValues())/2; // this is object's vertices not localVertices
    rBird = 2;
    window.bird.centerBoundingPosition = [window.bird.modelMatrix[0], window.bird.modelMatrix[5], window.bird.modelMatrix[10]];
    bBird = math.dot(wsDirec, math.subtract(wsStart, window.bird.centerBoundingPosition));
    cBird = math.dot(math.subtract(wsStart, window.bird.centerBoundingPosition), math.subtract(wsStart, window.bird.centerBoundingPosition)) - (rBird / 2 * rBird / 2);
    delta = math.sqrt(math.pow(bBird, 2) - (4 * a * cBird));
    delta = typeof delta == "object" ? delta.im : delta;
    tBird1 = (-bBird - delta) / (2 * a);
    tBird2 = (-bBird + delta) / (2 * a);
    tBird = math.min(tBird1, tBird2);
    console.log("tBird : " + tBird + "\n" + tBird1 + "\n" + tBird2);

    // rHorse = math.distance(window.horse.mesh.getMinimumVertexValues(), window.horse.mesh.getMaximumVertexValues())/2; // this is object's vertices not localVertices
    rHorse = 2;
    window.horse.centerBoundingPosition = [window.horse.modelMatrix[0], window.horse.modelMatrix[5], window.horse.modelMatrix[10]];
    bHorse = math.dot(wsDirec, math.subtract(wsStart, window.horse.centerBoundingPosition));
    cHorse = math.dot(math.subtract(wsStart, window.horse.centerBoundingPosition), math.subtract(wsStart, window.horse.centerBoundingPosition)) - (rHorse / 2 * rHorse / 2);
    deltaH = math.sqrt(math.pow(bHorse, 2) - (4 * a * cHorse));
    deltaH = typeof deltaH == "object" ? deltaH.im : deltaH;
    tHorse1 = (-bHorse - deltaH) / (2 * a);
    tHorse2 = (-bHorse + deltaH) / (2 * a);
    tHorse = math.min(tHorse1, tHorse2);
    console.log("tHorse : " + tHorse + "\n" + tHorse1 + "\n" + tHorse2);

    // rFish = math.distance(window.fish.mesh.getMinimumVertexValues(), window.fish.mesh.getMaximumVertexValues())/2; // this is object's vertices not localVertices
    rFish = 2;
    window.fish.centerBoundingPosition = [window.fish.modelMatrix[0], window.fish.modelMatrix[5], window.fish.modelMatrix[10]];
    bFish = math.dot(wsDirec, math.subtract(wsStart, window.fish.centerBoundingPosition));
    cFish = math.dot(math.subtract(wsStart, window.fish.centerBoundingPosition), math.subtract(wsStart, window.fish.centerBoundingPosition)) - (rFish / 2 * rFish / 2);
    deltaFi = math.sqrt(math.pow(bFish, 2) - (4 * a * cFish));
    deltaFi = typeof deltaFi == "object" ? deltaFi.im : deltaFi;
    tFish1 = (-bFish - deltaFi) / (2 * a);
    tFish2 = (-bFish + deltaFi) / (2 * a);
    tFish = math.min(tFish1, tFish2);
    console.log("tFish : " + tFish + "\n" + tFish1 + "\n" + tFish2);

    // rFrog = math.distance(window.frog.mesh.getMinimumVertexValues(), window.frog.mesh.getMaximumVertexValues())/2; // this is object's vertices not localVertices
    rFrog = 2;
    window.frog.centerBoundingPosition = [window.frog.modelMatrix[0], window.frog.modelMatrix[5], window.frog.modelMatrix[10]];
    bFrog = math.dot(wsDirec, math.subtract(wsStart, window.frog.centerBoundingPosition));
    cFrog = math.dot(math.subtract(wsStart, window.frog.centerBoundingPosition), math.subtract(wsStart, window.frog.centerBoundingPosition)) - (rFrog / 2 * rFrog / 2);
    deltaF = math.sqrt(math.pow(bFrog, 2) - (4 * a * cFrog));
    deltaF = typeof deltaF == "object" ? deltaF.im : deltaF;
    tFrog1 = (-bFrog - deltaF) / (2 * a);
    tFrog2 = (-bFrog + deltaF) / (2 * a);
    tFrog = math.min(tFrog1, tFrog2);
    console.log("tFrog : " + tFrog + "\n" + tFrog1 + "\n" + tFrog2);

    // rBear = math.distance(window.bear.mesh.getMinimumVertexValues(), window.bear.mesh.getMaximumVertexValues())/2; // this is object's vertices not localVertices
    rBear = 2;
    window.bear.centerBoundingPosition = [window.bear.modelMatrix[0], window.bear.modelMatrix[5], window.bear.modelMatrix[10]];
    bBear = math.dot(wsDirec, math.subtract(wsStart, window.bear.centerBoundingPosition));
    cBear = math.dot(math.subtract(wsStart, window.bear.centerBoundingPosition), math.subtract(wsStart, window.bear.centerBoundingPosition)) - (rBear / 2 * rBear / 2);
    deltaB = math.sqrt(math.pow(bBear, 2) - (4 * a * cBear));
    deltaB = typeof deltaB == "object" ? deltaB.im : deltaB;
    tBear1 = (-bBear - deltaB) / (2 * a);
    tBear2 = (-bBear + deltaB) / (2 * a);
    tBear = math.min(tBear1, tBear2);
    console.log("tBear : " + tBear + "\n" + tBear1 + "\n" + tBear2);

    //select that object so that it starts to turn.

}
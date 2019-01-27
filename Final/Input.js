var Input = {};

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

Input.mouseDelta = {x:0, y:0};
Input.mousePosition = {x:0, y:0};
var lastMousePosition = {x:0, y:0};
var isMousePositionInitialized = false;

Input.enableCursorLock = function(){
    canvas.onclick = function() {
        canvas.requestPointerLock();
    }
}

Input.init = function(){
    document.addEventListener('mousemove', function(evt) {
        if(Input.isLocked){
            Input.mouseDelta.x = evt.movementX;
            Input.mouseDelta.y = evt.movementY;
        }else{
            Input.mousePosition = getMousePos(canvas, evt);

            if(isMousePositionInitialized){
                Input.mouseDelta.x = Input.mousePosition.x - lastMousePosition.x;
                Input.mouseDelta.y = Input.mousePosition.y - lastMousePosition.y;
            }

            lastMousePosition.x = Input.mousePosition.x;
            lastMousePosition.y = Input.mousePosition.y;
            
            isMousePositionInitialized = true;
        }
    }, false);

    canvas.addEventListener('click', function(evt) {
        window.mousePosition = getMousePos(canvas, evt);
        if(window.mouseClicked)
            window.mouseClicked();
    }, false);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
}

Input.update = function(){
    if(document.pointerLockElement === canvas){
        Input.isLocked = true;
    }else{
        Input.isLocked = false;
    }

    Input.mouseDelta.x = 0;
    Input.mouseDelta.y = 0;
}

Input.isKeyDown = function(keyCode){
    return pressedKeys[keyCode];
}

var pressedKeys = {};

function handleKeyDown(event) {    
    checkModifierKeys(event);

    pressedKeys[event.keyCode] = true;
}

function handleKeyUp(event) {
    checkModifierKeys(event);

    pressedKeys[event.keyCode] = false;
}

function checkModifierKeys(event){
    if(event.shiftKey)
        pressedKeys[Keys.Shift] = true;
    else
        pressedKeys[Keys.Shift] = false;
}

// http://keycode.info/
window.Keys = {
    Shift : -1,
    RightArrow : 39,
    LeftArrow : 37,
    UpArrow : 38,
    DownArrow : 40,
    Escape : 27,
    Space : 32,
    W : 87,
    A : 65,
    S : 83,
    D : 68
};
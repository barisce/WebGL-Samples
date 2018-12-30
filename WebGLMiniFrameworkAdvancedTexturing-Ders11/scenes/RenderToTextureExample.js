window.init = function(){    
    Input.enableCursorLock();

    var camera = new Camera();
    camera.position = [0.0, 0, -6];
    camera.lookAt = [0.0, -1.0, 0.0];

    var renderTexture = new RenderTexture();

    window.rtCamera = new Camera(renderTexture, [1, 0.5, 1, 1]);
    rtCamera.position = [2, 2, 1];
    rtCamera.lookAt = [1, 1, 0];

    
    var simpleProgram = new Program('color-vs', 'color-fs');
    simpleProgram.setVertexPositionAttributeName("aVertexPosition");
    simpleProgram.setVertexColorAttributeName("aVertexColor");

    var simpleMaterial = new Material(simpleProgram);
    
    window.simpleBox = new SceneObject(createSimpleBoxMesh(0.3), simpleMaterial);
    window.simpleBox.localPosition = [1, 1, 0];

    var texturedProgram = new Program('textured-vs', 'textured-fs');
    texturedProgram.setVertexPositionAttributeName("aVertexPosition");
    texturedProgram.setTextureCoordinateAttributeName("aTextureCoord");
    
    var tvMaterial = new Material(texturedProgram);
    tvMaterial.setTexture(renderTexture);

    window.television = new SceneObject(createBoxMesh(), tvMaterial); 
    television.localEulerAngles = [0, 0, 180];
}

window.update = function(){    
    if(Input.isKeyDown(Keys.Shift)){
        window.rtCamera.setFreeMove(true);
        window.mainCamera.setFreeMove(false);
    }else{
        window.mainCamera.setFreeMove(true);
        window.rtCamera.setFreeMove(false);
    }

    if(Input.isKeyDown(Keys.RightArrow)){
        window.simpleBox.localPosition[0] -= 0.1;
    }
    if(Input.isKeyDown(Keys.LeftArrow)){
        window.simpleBox.localPosition[0] += 0.1;
    }
    if(Input.isKeyDown(Keys.UpArrow)){
        window.simpleBox.localPosition[1] += 0.1;
    }
    if(Input.isKeyDown(Keys.DownArrow)){
        window.simpleBox.localPosition[1] -= 0.1;
    }
}
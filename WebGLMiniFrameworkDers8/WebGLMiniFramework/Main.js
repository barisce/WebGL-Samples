

window.init = function(){
    var camera = new Camera();
    camera.position = [0, 3, -7];
    camera.lookAt = [1.0, 2.0, 0.0];

    //var fTexture = new Texture('https://webglfundamentals.org/webgl/resources/f-texture.png');
    var fTexture = new Texture('https://i.hizliresim.com/MVXRp1.jpg');
    
    var texturedProgram = new Program('textured-vs', 'textured-fs');
    texturedProgram.setVertexPositionAttributeName("aVertexPosition");
    texturedProgram.setTextureCoordinateAttributeName("aTextureCoord");
    texturedProgram.setTextureUniformName("u_texture");
    
    var texturedMaterial = new Material(texturedProgram);
    texturedMaterial.setTexture(fTexture);

    window.box = new SceneObject(createBoxMesh(), texturedMaterial); 

    var slider1 = createSlider("Rotate Y : ", 0, 0, 360, function(){
        window.box.localEulerAngles = [0, this.value, 0];
    });

    var button1 = createButton("Test", function(){
        alert("Deneme");
    });

}

window.update = function(){
    window.mainCamera.update();

    drawSceneObjects();
}



window.init = function(){
    var camera = new Camera();
    camera.position = [0, 3, -7];
    camera.lookAt = [1.0, 2.0, 0.0];

    var program1 = new Program('color-vs', 'color-fs');
    program1.setVertexPositionAttributeName("aVertexPosition");
    program1.setVertexColorAttributeName("aVertexColor");

    var material1 = new Material(program1);

    var mesh1 = createPyramidMesh();

    var pyramid = new SceneObject(mesh1, material1);

    pyramid.localPosition = [2, 0, 0];
    
    var program2 = new Program('uniformColor-vs', 'uniformColor-fs');
    
    var material2 = new Material(program2);

    material2.setCustomUniformColor("uColor", [1,0,0,1]);

    //callback function - gets called when object is loaded
    loadObjMesh("https://zumrakavafoglu.github.io/files/bca611-cg/models/bird.obj",function(mesh){
        window.bunny = new SceneObject(mesh, material2); 
        window.bunny.scale = [0.1,0.1,0.1];
    });

    var slider1 = createSlider("Rotate Y : ", 0, 0, 360, function(){
        window.bunny.localEulerAngles = [0, this.value, 0];
    });

    var button1 = createButton("Test", function(){
        alert("Deneme");
    });

}

window.update = function(){
    window.mainCamera.update();

    drawSceneObjects();
}

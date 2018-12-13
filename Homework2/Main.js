window.init = function(){
    var camera = new Camera();
    camera.position = [0, 2, -10];
    camera.lookAt = [0.0, 1.0, 0.0];

    words = ['<strong>Bird</strong>', '<strong>Horse</strong>', '<strong>Fish</strong>', '<strong>Frog</strong>', '<strong>Bear</strong>'];

    var program1 = new Program('color-vs', 'color-fs');
    program1.setVertexPositionAttributeName("aVertexPosition");
    program1.setVertexColorAttributeName("aVertexColor");

    var material1 = new Material(program1);
    var mesh1 = createSphereMesh();
    var pyramid = new SceneObject(mesh1, material1);
    pyramid.localPosition = [2, 0, 0];
    
    var program2 = new Program('uniformColor-vs', 'uniformColor-fs');
    
    var material2 = new Material(program2);
    material2.setCustomUniformColor("uColor", [1,0,0,1]);

    //callback function - gets called when object is loaded
    loadObjMesh("https://zumrakavafoglu.github.io/files/bca611-cg/models/bird.obj",function(mesh){
        window.bird = new SceneObject(mesh, material2);
        window.bird.localPosition = [6, 3, 2];
        window.bird.localEulerAngles = [-90, 180, 0];
        window.bird.scale = [0.05,0.05,0.05];
    });

    var material3 = new Material(program2);
    material3.setCustomUniformColor("uColor", [0,0,1,1]);

    loadObjMesh("https://zumrakavafoglu.github.io/files/bca611-cg/models/horse.obj",function(mesh){
        window.horse = new SceneObject(mesh, material3);
        window.horse.localPosition = [0, 3, 2];
        window.horse.localEulerAngles = [-90, 180, 0];
        window.horse.scale = [0.1,0.1,0.1];
    });

    var material4 = new Material(program2);
    material4.setCustomUniformColor("uColor", [.5,0,0,1]);

    loadObjMesh("https://zumrakavafoglu.github.io/files/bca611-cg/models/fish.obj",function(mesh){
        window.fish = new SceneObject(mesh, material4);
        window.fish.localPosition = [-6, 3, 2];
        window.fish.localEulerAngles = [-90, -90, 0];
        window.fish.scale = [0.1,0.1,0.1];
    });

    var material5 = new Material(program2);
    material5.setCustomUniformColor("uColor", [0,.5,0,1]);

    loadObjMesh("https://zumrakavafoglu.github.io/files/bca611-cg/models/frog.obj",function(mesh){
        window.frog = new SceneObject(mesh, material5);
        window.frog.localPosition = [6, -2, 2];
        window.frog.localEulerAngles = [-90, 0, 0];
        window.frog.scale = [0.15,0.15,0.15];
    });

    var material6 = new Material(program2);
    material6.setCustomUniformColor("uColor", [0,1,0,1]);

    loadObjMesh("https://zumrakavafoglu.github.io/files/bca611-cg/models/bear.OBJ",function(mesh){
        window.bear = new SceneObject(mesh, material6);
        window.bear.localPosition = [0, -2, 2];
        window.bear.localEulerAngles = [0, 180, 0];
        window.bear.scale = [0.8,0.8,0.8];
    });

    var slider1 = createSlider("Rotate Duck : ", 0, 0, 360, function(){
        window.bird.localEulerAngles = [-90 - this.value, this.value - 180, 0];
    });

    var slider2 = createSlider("Rotate Horse : ", 0, 0, 360, function(){
        window.horse.localEulerAngles = [-90 - this.value, this.value - 180, 0];
    });

    var slider3 = createSlider("Rotate Fish : ", 0, 0, 360, function(){
        window.fish.localEulerAngles = [-90 - this.value, this.value - 90, 0];
    });

    var slider4 = createSlider("Rotate Frog : ", 0, 0, 360, function(){
        window.frog.localEulerAngles = [-90 - this.value, this.value, 0];
    });

    var slider5 = createSlider("Rotate Bear : ", 0, 0, 360, function(){
        window.bear.localEulerAngles = [this.value, this.value, 0];
    });

    var button1 = createButton("Test", function(){
        alert("Deneme");
    });

    timedWordSelect();
};

window.update = function(){
    window.mainCamera.update();

    drawSceneObjects();
};
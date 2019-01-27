window.init = function(){
    Input.enableCursorLock();
    var renderTexture = new RenderTexture(canvas.width, canvas.height);

    var buddhaCubemap = new CubeMap(
        "https://i.hizliresim.com/0GJk9o.jpg",
        "https://i.hizliresim.com/d7g2mr.jpg",
        "https://i.hizliresim.com/4GykXJ.jpg",
        "https://i.hizliresim.com/5G6kbl.jpg",
        "https://i.hizliresim.com/JOb4mj.jpg",
        "https://i.hizliresim.com/AyrqWr.jpg"
    );

    var skybox = new Skybox(buddhaCubemap);

    var camera = new Camera();
    camera.position = [0.0, 3.0, 6];
    camera.lookAt = [0.0, 1.0, 0.0];

    window.rtCamera = new Camera(renderTexture, [1, 0.5, 1, 1]);
    rtCamera.position = [0.0, 3.0, 6];
    rtCamera.lookAt = [0.0, 1.0, 0.0];
    rtCamera.setSkybox(skybox);
    rtCamera.setFreeMove(true);

    // var diffuseTexture = new Texture("https://upload.wikimedia.org/wikipedia/commons/2/2c/IntP_Brick.png");
    // var normalTexture = new Texture("https://upload.wikimedia.org/wikipedia/commons/8/86/IntP_Brick_NormalMap.png");

    var normalProgram = new Program('pointLight-vs', 'pointLight-fs');

    normalProgram.setVertexPositionAttributeName("aVertexPosition");
    normalProgram.setVertexNormalAttributeName("aVertexNormal");
    normalProgram.setTextureCoordinateAttributeName("aTextureCoord");

    normalProgram.setTextureUniformName("uDiffuseTexture");
    normalProgram.setNormalTextureUniformName("uNormalTexture");
    normalProgram.setInverseModelMatrixUniformName("uInverseModelMatrix");
    normalProgram.setModelMatrixUniformName("uModelMatrix");

    window.light = new Light(LightType.Spot);

    var simpleProgram = new Program('color-vs', 'color-fs');
    simpleProgram.setVertexPositionAttributeName("aVertexPosition");
    simpleProgram.setVertexColorAttributeName("aVertexColor");

    var texturedProgram = new Program('textured-vs-fullscreen', 'textured-fs-fullscreen');
    texturedProgram.setVertexPositionAttributeName("aVertexPosition");
    texturedProgram.setTextureCoordinateAttributeName("aTextureCoord");
    texturedProgram.setGrainEffectUniformName("uGrainEffect");

    var tvMaterial = new Material(texturedProgram);

    tvMaterial.setTexture(renderTexture);
    window.fullScreenQuad = new SceneObject(createQuad(), tvMaterial);
    rtCamera.ignoreSceneObject(window.fullScreenQuad);

    window.grainEffect = 0.0;

    window.light.direction = rtCamera.lookAt;
    window.light.isFreeMoveEnabled = true;

    prepareScene(normalProgram, renderTexture);

    var attenuationSlider = createSlider("Attenuation :\t", window.light.attenuation, 0.001, 1, function () {
        window.light.attenuation = this.value;
    });
    var innerSlider = createSlider("Inner :\t", window.light.innerLimit, 0, 2, function () {
        window.light.innerLimit = this.value;
    });
    var outerSlider = createSlider("Outer :\t", window.light.outerLimit, 0, 2, function () {
        window.light.outerLimit = this.value;
    });
};

window.update = function(){
    window.grainEffect += 0.1;

    window.mainCamera.position[0] = window.rtCamera.position[0];
    window.mainCamera.position[1] = window.rtCamera.position[1];
    window.mainCamera.position[2] = window.rtCamera.position[2];

    window.mainCamera.lookAt[0] = window.rtCamera.lookAt[0];
    window.mainCamera.lookAt[1] = window.rtCamera.lookAt[1];
    window.mainCamera.lookAt[2] = window.rtCamera.lookAt[2];

    window.light.direction[0] = window.rtCamera.lookAt[0];
    window.light.direction[1] = window.rtCamera.lookAt[1];
    window.light.direction[2] = window.rtCamera.lookAt[2];

    window.light.position[0] = window.rtCamera.position[0];
    window.light.position[1] = window.rtCamera.position[1];
    window.light.position[2] = window.rtCamera.position[2];

    // if(Input.isKeyDown(Keys.RightArrow)){
    //     window.light.direction[0] -= 0.1;
    // }
    // if(Input.isKeyDown(Keys.LeftArrow)){
    //     window.light.direction[0] += 0.1;
    // }
    // if(Input.isKeyDown(Keys.UpArrow)){
    //     window.light.direction[1] += 0.1;
    // }
    // if(Input.isKeyDown(Keys.DownArrow)){
    //     window.light.direction[1] -= 0.1;
    // }
};

prepareScene = function(normalProgram){
    // var diffuseTexture = new Texture("https://upload.wikimedia.org/wikipedia/commons/2/2c/IntP_Brick.png");
    // var normalTexture = new Texture("https://upload.wikimedia.org/wikipedia/commons/8/86/IntP_Brick_NormalMap.png");
    // var normalProgram = new Program('pointLightNormalMapping-vs', 'pointLightNormalMapping-fs');

    var floorTexture = new Texture("https://raw.githubusercontent.com/barisce/WebGL-Samples/master/objects/texture/FloorTexture.jpg");
    var wallTexture = new Texture("https://raw.githubusercontent.com/barisce/WebGL-Samples/master/objects/texture/WallTexture.jpg");
    var realWoodTexture = new Texture("https://raw.githubusercontent.com/barisce/WebGL-Samples/master/objects/texture/Wood_Texture.jpg");
    var marbleTexture = new Texture("https://raw.githubusercontent.com/barisce/WebGL-Samples/master/objects/texture/marble.jpg");
    var glassTexture = new Texture("https://raw.githubusercontent.com/barisce/WebGL-Samples/master/objects/texture/glass.png");
    var woodTexture = new Texture("https://raw.githubusercontent.com/barisce/WebGL-Samples/master/objects/texture/wood.jpg");
    var woodAltTexture = new Texture("https://raw.githubusercontent.com/barisce/WebGL-Samples/master/objects/texture/wood2.png");
    var whiteWoodTexture = new Texture("https://raw.githubusercontent.com/barisce/WebGL-Samples/master/objects/texture/wood_white.jpg");
    var woodTileBaseTexture = new Texture("https://raw.githubusercontent.com/barisce/WebGL-Samples/master/objects/texture/WoodTile_basecolor.jpg");
    var tvTexture = new Texture("https://raw.githubusercontent.com/barisce/WebGL-Samples/master/objects/texture/tv.jpg");

    var woodTileMaterial = new Material(normalProgram);
    woodTileMaterial.setTexture(woodTileBaseTexture);

    var floorMaterial = new Material(normalProgram);
    floorMaterial.setTexture(floorTexture);

    var wallMaterial = new Material(normalProgram);
    wallMaterial.setTexture(wallTexture);

    var whiteWoodMaterial = new Material(normalProgram);
    whiteWoodMaterial.setTexture(whiteWoodTexture);

    var realWoodMaterial = new Material(normalProgram);
    realWoodMaterial.setTexture(realWoodTexture);

    var woodMaterial = new Material(normalProgram);
    woodMaterial.setTexture(woodTexture);

    var woodAltMaterial = new Material(normalProgram);
    woodAltMaterial.setTexture(woodAltTexture);

    var marbleMaterial = new Material(normalProgram);
    marbleMaterial.setTexture(marbleTexture);

    var glassMaterial = new Material(normalProgram);
    glassMaterial.setTexture(glassTexture);

    var tvMaterial = new Material(normalProgram);
    tvMaterial.setTexture(tvTexture);

    window.ground = new SceneObject(createQuad(10),floorMaterial);
    window.ground.localPosition = [0, 0, 0];
    window.ground.localEulerAngles = [-90, 90, -180];

    window.wall1 = new SceneObject(createQuad(10),wallMaterial);
    window.wall1.localPosition = [0, 10, 10];
    window.wall1.localEulerAngles = [0, 180, 0];

    window.wall2 = new SceneObject(createQuad(10),wallMaterial);
    window.wall2.localPosition = [0, 10, -10];
    window.wall2.localEulerAngles = [0, 0, 0];

    window.wall3 = new SceneObject(createQuad(10),wallMaterial);
    window.wall3.localPosition = [-10, 10, 0];
    window.wall3.localEulerAngles = [0, 90, 0];

    window.wall4 = new SceneObject(createQuad(10),wallMaterial);
    window.wall4.localPosition = [10, 10, 0];
    window.wall4.localEulerAngles = [0, -90, 0];

    loadObjMesh("https://raw.githubusercontent.com/barisce/WebGL-Samples/master/objects/obj/Desk.obj", function (mesh) {
        window.desk = new SceneObject(mesh, realWoodMaterial);
        window.desk.localPosition = [0, 0, -7.9];
        window.desk.localEulerAngles = [0, 0, 0];
        window.desk.scale = [0.02, 0.02, 0.02];
    });

    loadObjMesh("https://raw.githubusercontent.com/barisce/WebGL-Samples/master/objects/obj/InteriorDoor.obj", function (mesh) {
        window.door = new SceneObject(mesh, woodTileMaterial);
        window.door.localPosition = [-9.85, 0, 6.5];
        window.door.localEulerAngles = [0, 90, 0];
        window.door.scale = [0.1, 0.1, 0.1];
    });

    loadObjMesh("https://raw.githubusercontent.com/barisce/WebGL-Samples/master/objects/obj/coffee_mug.obj", function (mesh) {
        window.mug = new SceneObject(mesh, glassMaterial);
        window.mug.localPosition = [1, 4.25, -7];
        window.mug.localEulerAngles = [0, 0, 0];
        window.mug.scale = [0.01, 0.01, 0.01];
    });

    // loadObjMesh("https://raw.githubusercontent.com/barisce/WebGL-Samples/master/objects/obj/kitchen_furniture.obj", function (mesh) {
    //     window.kitchenfurniture = new SceneObject(mesh, marbleMaterial);
    //     window.kitchenfurniture.localPosition = [2, 0, 2];
    //     window.kitchenfurniture.localEulerAngles = [0, 0, 0];
    //     window.kitchenfurniture.scale = [0.02, 0.02, 0.02];
    // });

    loadObjMesh("https://raw.githubusercontent.com/barisce/WebGL-Samples/master/objects/obj/table_and_chair.obj", function (mesh) {
        window.tableandchair = new SceneObject(mesh, woodMaterial);
        window.tableandchair.localPosition = [-7, 0, -1];
        window.tableandchair.localEulerAngles = [0, -90, 0];
        window.tableandchair.scale = [0.05, 0.05, 0.05];
    });

    loadObjMesh("https://raw.githubusercontent.com/barisce/WebGL-Samples/master/objects/obj/Samsung_LED_TV.obj", function (mesh) {
        window.windows = new SceneObject(mesh, tvMaterial);
        window.windows.localPosition = [3.55, 4.22, -7];
        window.windows.localEulerAngles = [90, 180, 180];
        window.windows.scale = [0.2, 0.2, 0.2];
    });
};
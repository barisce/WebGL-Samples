window.init = function () {
    Input.enableCursorLock();
    var camera = new Camera();
    camera.position = [0, 0, 10];
    camera.lookAt = [0.0, 0.0, 0.0];

    // pointLight-vs is per vertex point lighting and pointLight2-vs is per fragment point lighting
    // comment one to see the other one
    // var lightProgram = new Program('pointLight-vs', 'pointLight-fs');
    var lightProgram = new Program('pointLight2-vs', 'pointLight2-fs');

    lightProgram.setVertexPositionAttributeName("aVertexPosition");
    lightProgram.setVertexNormalAttributeName("aVertexNormal");

    lightProgram.setDiffuseProductUniformName("uDiffuseProduct");
    lightProgram.setSpecularProductUniformName("uSpecularProduct");
    lightProgram.setAmbientProductUniformName("uAmbientProduct");
    lightProgram.setShininessUniformName("uShininess");
    lightProgram.setAttenuationUniformName("uAttenuation");

    var material = new Material(lightProgram);

    loadObjMesh("https://zumrakavafoglu.github.io/files/bca611-cg/models/smoothSphere.obj", function (mesh) {
        window.sphere = new SceneObject(mesh, material);
        window.sphere.localPosition = [-5, 0, 0];
        window.sphere.scale = [2, 2, 2];
    });

    // Bird
    loadObjMesh("https://zumrakavafoglu.github.io/files/bca611-cg/models/bird.obj", function (mesh) {
        window.bird = new SceneObject(mesh, material);
        window.bird.localPosition = [5, -2, 0];
        window.bird.localEulerAngles = [-90, 0, 0];
        window.bird.scale = [0.1, 0.1, 0.1];
    });

    loadObjMesh("https://zumrakavafoglu.github.io/files/bca611-cg/models/frog.obj", function (mesh) {
        window.frog = new SceneObject(mesh, material);
        window.frog.localPosition = [0, 4, 0];
        window.frog.localEulerAngles = [-90, 180, 0];
        window.frog.scale = [0.15, 0.15, 0.15];
    });

    new Light(LightType.Point);


    var slider1 = createSlider("Change Angle Y : ", 0, 0, 360, function () {
        window.sphere.localEulerAngles = [0, this.value, 0];
        window.bird.localEulerAngles = [-90, 0 - this.value, 0];
        window.frog.localEulerAngles = [-90, 180 - this.value, 0];
    });

    var slider2 = createSlider("X : ", 0, -10, 10, function () {
        window.light.position = [this.value, window.light.position[1], window.light.position[2]];
    });

    var slider3 = createSlider("Y : ", 0, -10, 10, function () {
        window.light.position = [window.light.position[0], this.value, window.light.position[2]];
    });

    var slider4 = createSlider("Z : ", 0, -10, 10, function () {
        window.light.position = [window.light.position[0], window.light.position[1],this.value];
    });

    var shininessSlider = createSlider("Shininess : ", material.shininess, 1, 10, function () {
        material.shininess = this.value;
    });

    var attenuationSlider = createSlider("Attenuation : ", window.light.attenuation, 0, 1, function () {
        window.light.attenuation = this.value;
    });

    var button1 = createButton("Reset", function () {
        window.light.position = [0, 0, 0];
        window.mainCamera.position = [0, 0, 10];
        camera.lookAt = [0.0, 0.0, 0.0];
    });

};

window.update = function () {
    window.mainCamera.update();
    window.mainCamera.setFreeMove(true);
    drawSceneObjects();
};

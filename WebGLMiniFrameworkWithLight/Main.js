

window.init = function(){
    var camera = new Camera();
    camera.position = [0, 0, -3];
    camera.lookAt = [0.0, 0.0, 0.0];

   /* var program1 = new Program('color-vs', 'color-fs');
    program1.setVertexPositionAttributeName("aVertexPosition");
    program1.setVertexColorAttributeName("aVertexColor");

    var material1 = new Material(program1);

    var pyramid = new SceneObject(createPyramidMesh(), material1);

    pyramid.localPosition = [2, 0, 0];

    var fTexture = new Texture('https://webglfundamentals.org/webgl/resources/f-texture.png');
    
    var texturedProgram = new Program('textured-vs', 'textured-fs');
    texturedProgram.setVertexPositionAttributeName("aVertexPosition");
    texturedProgram.setTextureCoordinateAttributeName("aTextureCoord");
    
    var texturedMaterial = new Material(texturedProgram);
    texturedMaterial.setTexture(fTexture);

    window.box = new SceneObject(createBoxMesh(), texturedMaterial); 
    pyramid.parent = box;*/

   /* var lightProgram = new Program('directionalLight-vs', 'directionalLight-fs');

    lightProgram.setVertexPositionAttributeName("aVertexPosition");
    lightProgram.setVertexNormalAttributeName("aVertexNormal");

    lightProgram.setDiffuseProductUniformName("uDiffuseProduct");
    lightProgram.setSpecularProductUniformName("uSpecularProduct");
    lightProgram.setAmbientProductUniformName("uAmbientProduct");
    lightProgram.setShininessUniformName("uShininess");

    var material = new Material(lightProgram);
    //material.diffuseColor = [1,0,0,1];

    loadObjMesh("https://zumrakavafoglu.github.io/files/bca611-cg/models/smoothSphere.obj",function(mesh){
        window.sphere = new SceneObject(mesh, material); 
       // window.sphere.localPosition = [2,0,0]

    });*/

   /* var perFragmentLightProgram = new Program('directionalLight2-vs', 'directionalLight2-fs');

    perFragmentLightProgram.setVertexPositionAttributeName("aVertexPosition");
    perFragmentLightProgram.setVertexNormalAttributeName("aVertexNormal");

    perFragmentLightProgram.setDiffuseProductUniformName("uDiffuseProduct");
    perFragmentLightProgram.setSpecularProductUniformName("uSpecularProduct");
    perFragmentLightProgram.setAmbientProductUniformName("uAmbientProduct");
    perFragmentLightProgram.setShininessUniformName("uShininess");

    var material2 = new Material(perFragmentLightProgram);
   // material2.diffuseColor = [1,0,0,1];


    loadObjMesh("https://zumrakavafoglu.github.io/files/bca611-cg/models/smoothSphere.obj",function(mesh2){
        window.sphere2 = new SceneObject(mesh2, material2); 
       // window.sphere2.localPosition = [-2,0,0]
    });*/
    
    var perFragmentLightProgramWithTexture = new Program('directionalLightWithTexture-vs', 'directionalLightWithTexture-fs');

    perFragmentLightProgramWithTexture.setVertexPositionAttributeName("aVertexPosition");
    perFragmentLightProgramWithTexture.setVertexNormalAttributeName("aVertexNormal");
    perFragmentLightProgramWithTexture.setTextureCoordinateAttributeName("aTextureCoord");

    perFragmentLightProgramWithTexture.setDiffuseProductUniformName("uDiffuseProduct");
    perFragmentLightProgramWithTexture.setSpecularProductUniformName("uSpecularProduct");
    perFragmentLightProgramWithTexture.setAmbientProductUniformName("uAmbientProduct");
    perFragmentLightProgramWithTexture.setShininessUniformName("uShininess");

    var fTexture = new Texture('https://webglfundamentals.org/webgl/resources/f-texture.png');

    var material3 = new Material(perFragmentLightProgramWithTexture);
    material3.setTexture(fTexture);


    loadObjMesh("https://zumrakavafoglu.github.io/files/bca611-cg/models/smoothSphere.obj",function(mesh3){
        window.sphere3 = new SceneObject(mesh3, material3); 
       // window.sphere2.localPosition = [-2,0,0]
    });
    
    new Light(LightType.Directional);

    var slider1 = createSlider("Euler Angle Y : ", 0, 0, 360, function(){
       // window.sphere.localEulerAngles = [0, this.value, 0];
      //  window.sphere2.localEulerAngles = [0, this.value, 0];
        window.sphere3.localEulerAngles = [0, this.value, 0];
    });

    var dirXSlider = createSlider("Light Direction X : ", window.light.direction[0], -1, 1, function(){
        window.light.direction[0] = this.value;
      //  window.light.direction[0] = 0;
        console.log("lightX: ", window.light.direction[0]);
    });

    var dirYSlider = createSlider("Light Direction Y : ", window.light.direction[1], -1, 1, function(){
        window.light.direction[1] = this.value;
        console.log("lightY: ", window.light.direction[1]);

    });

    var dirZSlider = createSlider("Light Direction Z : ", window.light.direction[2], -1, 1, function(){
        window.light.direction[2] = this.value;
        console.log("lightZ: ", window.light.direction[2]);

    });

    var shininessSlider = createSlider("Shininess : ", material3.shininess, 1, 10, function(){
       // material.shininess = this.value;
      //  material2.shininess = this.value;
       material3.shininess = this.value;

    });

    var button1 = createButton("Test", function(){
        alert("Deneme");
    });

}

window.update = function(){
    window.mainCamera.update();

    drawSceneObjects();
}

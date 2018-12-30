

window.init = function(){
    var camera = new Camera();
    camera.position = [0.0, 0, -6];
    camera.lookAt = [0.0, -1.0, 0.0];

   /* var program1 = new Program('color-vs', 'color-fs');
    program1.setVertexPositionAttributeName("aVertexPosition");
    program1.setVertexColorAttributeName("aVertexColor");

    var material1 = new Material(program1);

    var pyramid = new SceneObject(createPyramidMesh(), material1);*/

   // pyramid.localPosition = [2, 0, 0];

   /* var fTexture = new Texture('https://webglfundamentals.org/webgl/resources/f-texture.png');
    
    var texturedProgram = new Program('textured-vs', 'textured-fs');
    texturedProgram.setVertexPositionAttributeName("aVertexPosition");
    texturedProgram.setTextureCoordinateAttributeName("aTextureCoord");
    
    var texturedMaterial = new Material(texturedProgram);
    texturedMaterial.setTexture(fTexture);

    window.box = new SceneObject(createBoxMesh(), texturedMaterial); 
    pyramid.parent = box;*/

     //per vertex lighting 
    //without texture
    /*var lightProgram = new Program('directionalLight-vs', 'directionalLight-fs');
    
        lightProgram.setVertexPositionAttributeName("aVertexPosition");
        lightProgram.setVertexNormalAttributeName("aVertexNormal");
        
        lightProgram.setDiffuseProductUniformName("uDiffuseProduct");
        lightProgram.setSpecularProductUniformName("uSpecularProduct");
        lightProgram.setAmbientProductUniformName("uAmbientProduct");
        lightProgram.setShininessUniformName("uShininess");
           
        var material = new Material(lightProgram);
    
        loadObjMesh("https://zumrakavafoglu.github.io/files/bca611-cg/models/smoothSphere.obj",function(mesh){
            window.sphere = new SceneObject(mesh, material); 
        });
    */
    //per fragment lighting 
    //with texture
   /* var lightProgram = new Program('directionalLight2-vs', 'directionalLight2-fs');

    lightProgram.setVertexPositionAttributeName("aVertexPosition");
    lightProgram.setVertexNormalAttributeName("aVertexNormal");
    //for texture
    lightProgram.setTextureCoordinateAttributeName("aTextureCoord");

    lightProgram.setDiffuseProductUniformName("uDiffuseProduct");
    lightProgram.setSpecularProductUniformName("uSpecularProduct");
    lightProgram.setAmbientProductUniformName("uAmbientProduct");
    lightProgram.setShininessUniformName("uShininess");

    var fTexture = new Texture('https://webglfundamentals.org/webgl/resources/f-texture.png');
   
    var material = new Material(lightProgram);
    material.setTexture(fTexture);

    loadObjMesh("https://zumrakavafoglu.github.io/files/bca611-cg/models/smoothSphere.obj",function(mesh){
        window.sphere = new SceneObject(mesh, material); 
    });*/
    
    //per vertex point lighting
    //without texture
 /*   var lightProgram = new Program('pointLight-vs', 'pointLight-fs');
    
    lightProgram.setVertexPositionAttributeName("aVertexPosition");
    lightProgram.setVertexNormalAttributeName("aVertexNormal");
    
    lightProgram.setDiffuseProductUniformName("uDiffuseProduct");
    lightProgram.setSpecularProductUniformName("uSpecularProduct");
    lightProgram.setAmbientProductUniformName("uAmbientProduct");
    lightProgram.setShininessUniformName("uShininess");
        
    var material = new Material(lightProgram);

    loadObjMesh("https://zumrakavafoglu.github.io/files/bca611-cg/models/smoothSphere.obj",function(mesh){
        window.sphere = new SceneObject(mesh, material); 
    });*/

   /* var material = new Material(lightProgram);
    
    window.sphere = new SceneObject(createSimpleBoxMesh(), material); */

   // var directionalLightPerVertex = new Program('directionalLight-vs', 'directionalLight-fs');
   //lightProgram.setVertexPositionAttributeName("aVertexPosition");
    //directionalLightPerVertex.setTextureCoordinateAttributeName("aTextureCoord");
    //TODO: add  setVertexNormalAttributeName to Program.js
   // lightProgram.setVertexNormalAttributeName("aVertexNormal");
   
    
    //new Light(LightType.Point);

  /*  var slider1 = createSlider("Euler Angle Y : ", 0, 0, 360, function(){
        window.sphere.localEulerAngles = [0, this.value, 0];
    });

  /*  var dirXSlider = createSlider("Light Direction X : ", window.light.direction[0], -1, 1, function(){
        window.light.direction[0] = this.value;
    });

    var dirYSlider = createSlider("Light Direction Y : ", window.light.direction[1], -1, 1, function(){
        window.light.direction[1] = this.value;
    });

    var dirZSlider = createSlider("Light Direction Z : ", window.light.direction[2], -1, 1, function(){
        window.light.direction[2] = this.value;
    });*/

  /*  var lightPosXSlider = createSlider("Light Position X : ", window.light.position[0], -1, 1, function(){
        window.light.position[0] = this.value;
    });

    var lightPosYSlider = createSlider("Light Position Y : ", window.light.position[1], -1, 1, function(){
        window.light.position[1] = this.value;
    });

    var lightPosZSlider = createSlider("Light Position Z : ", window.light.position[2], -1, 1, function(){
        window.light.position[2] = this.value;
    });

    var shininessSlider = createSlider("Shininess : ", material.shininess, 1, 100, function(){
        material.shininess = this.value;
    });

    var button1 = createButton("Test", function(){
        alert("Deneme");
    });*/

    var program1 = new Program('particle-vs', 'particle-fs');
    program1.setVertexPositionAttributeName("aVertexPosition");
    program1.setVertexColorAttributeName("aVertexColor");
    program1.setPointSizeAttributeName("aPointSize");

    var groundHeight = -1;
    var particleSystem1 = new ParticleSystem(program1 , 1000, [0,0,0], [0,1,0], groundHeight, [3,1,3], true, 5, 10);

    var program2 = new Program('color-vs', 'color-fs');
    program2.setVertexPositionAttributeName("aVertexPosition");
    program2.setVertexColorAttributeName("aVertexColor");

    var material1 = new Material(program2);

    var frame = new SceneObject(createGroundMesh(), material1);
    frame.localPosition = [0,groundHeight,0];
   // frame.drawMode = gl.TRIANGLES;


}

window.update = function(){
    window.mainCamera.update();

    drawSceneObjects();
    drawParticleSystems();
}

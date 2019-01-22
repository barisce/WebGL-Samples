
window.init = function(){    
    Input.enableCursorLock();

    var camera = new Camera();
    camera.position = [0.0, 0, -6];
    camera.lookAt = [0.0, -1.0, 0.0];

    window.light = new Light(LightType.Point);
    
    var simpleProgram = new Program('color-vs', 'color-fs');
    simpleProgram.setVertexPositionAttributeName("aVertexPosition");
    simpleProgram.setVertexColorAttributeName("aVertexColor");

    var simpleMaterial = new Material(simpleProgram);
    
    window.lightIndicator = new SceneObject(createSimpleBoxMesh(0.3), simpleMaterial);
    window.lightIndicator.localPosition = [1.5, 1.5, -1.5];

    //Render To Texture Example
    var renderTexture = new RenderTexture();

    window.rtCamera = new Camera(renderTexture, [0, 0, 1, 1]);
    rtCamera.position = [-3.0, 0, 0];
    rtCamera.lookAt = [0.0, 0.0, 0.0];

    var texturedProgram = new Program('textured-vs', 'textured-fs');
    texturedProgram.setVertexPositionAttributeName("aVertexPosition");
    texturedProgram.setTextureCoordinateAttributeName("aTextureCoord");
    
    var texturedMaterial = new Material(texturedProgram);
    texturedMaterial.setTexture(renderTexture);

    window.box = new SceneObject(createBoxMesh(), texturedMaterial); 
    box.localEulerAngles = [0, 0, 180];
    //Render To Texture Example

    /*
    Input.enableCursorLock();

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
    camera.setSkybox(skybox);
    camera.position = [0.0, 0, -6];
    camera.lookAt = [0.0, -1.0, 0.0];

    var renderTexture = new RenderTexture();

    window.rtCamera = new Camera(renderTexture, [0, 0, 1, 1]);
    rtCamera.position = [-3.0, 0, 0];
    rtCamera.lookAt = [0.0, 0.0, 0.0];

    var texturedProgram = new Program('textured-vs', 'textured-fs');
    texturedProgram.setVertexPositionAttributeName("aVertexPosition");
    texturedProgram.setTextureCoordinateAttributeName("aTextureCoord");
    
    var texturedMaterial = new Material(texturedProgram);
    texturedMaterial.setTexture(renderTexture);

    window.box = new SceneObject(createBoxMesh(), texturedMaterial); 
    box.localEulerAngles = [0, 0, 180];

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
    });

    var program2 = new Program('color-vs', 'color-fs');
    program2.setVertexPositionAttributeName("aVertexPosition");
    program2.setVertexColorAttributeName("aVertexColor");

    var material1 = new Material(program2);

    var groundHeight = -1;

    var ground = new SceneObject(createGroundMesh(), material1);
    ground.localPosition = [0,groundHeight,0];
    // frame.drawMode = gl.TRIANGLES;

    var program1 = new Program('particle-vs', 'particle-fs');
    program1.setVertexPositionAttributeName("aVertexPosition");
    program1.setVertexColorAttributeName("aVertexColor");
    program1.setPointSizeAttributeName("aPointSize");

    var particleSystem1 = new ParticleSystem(program1 , 1000, [0,0,0], [0,1,0], groundHeight, [3,1,3], true, 5, 10);
*/
    //var diffuseTexture = new Texture('https://webglfundamentals.org/webgl/resources/f-texture.png');
    //var normalTexture = new Texture("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Normal_map_example_-_Map.png/600px-Normal_map_example_-_Map.png");

    /*
    var fTexture = new Texture('https://raw.githubusercontent.com/barisce/WebGL-Samples/master/objects/FloorTexture.jpg');

    var material3 = new Material(perFragmentLightProgramWithTexture);
    material3.setTexture(fTexture);

    loadObjMesh("https://raw.githubusercontent.com/barisce/WebGL-Samples/master/objects/EmptyRoom.obj", function (mesh3) { // bird bu
        window.bunny = new SceneObject(mesh3, material3);
        window.bunny.localPosition = [0, 0, 0];
        window.bunny.scale = [1,1,1];
        window.bunny.localEulerAngles = [0, 0, 0];
    });
    */
    
    var diffuseTexture = new Texture("https://upload.wikimedia.org/wikipedia/commons/2/2c/IntP_Brick.png");
    var normalTexture = new Texture("https://upload.wikimedia.org/wikipedia/commons/8/86/IntP_Brick_NormalMap.png");
    diffuseTexture.setAnisotropicFiltering(16);
    normalTexture.setAnisotropicFiltering(16);
    
    /*
    window.setAnisotropicFiltering = function(level){
        diffuseTexture.setAnisotropicFiltering(level);
        normalTexture.setAnisotropicFiltering(level);
    }

    window.setMipMap = function(enabled){
        diffuseTexture.setMipMap(enabled);
        normalTexture.setMipMap(enabled);
    }
    */

    //diffuseTexture.setAnisotropicFiltering(16);
    //normalTexture.setAnisotropicFiltering(16);

    var normalProgram = new Program('pointLightNormalMapping-vs', 'pointLightNormalMapping-fs');

    normalProgram.setVertexPositionAttributeName("aVertexPosition");
    normalProgram.setTextureCoordinateAttributeName("aTextureCoord");
    normalProgram.setVertexTangentAttributeName("aVertexTangent");
    normalProgram.setVertexBitangentAttributeName("aVertexBitangent");

    normalProgram.setTextureUniformName("uDiffuseTexture");
    normalProgram.setNormalTextureUniformName("uNormalTexture");
    normalProgram.setInverseModelMatrixUniformName("uInverseModelMatrix");
    normalProgram.setModelMatrixUniformName("uModelMatrix");
    
    var normalMappedMaterial = new Material(normalProgram);
    normalMappedMaterial.setTexture(diffuseTexture);
    normalMappedMaterial.setNormalTexture(normalTexture);

    //window.normalBox = new SceneObject(createBoxMeshWithTangents(), normalMappedMaterial); 

}

window.update = function(){
    for(var i=0; i<window.renderTextureCameras.length; i++){
        window.renderTextureCameras[i].update();
    }
    window.mainCamera.update();    
    
    if(Input.isKeyDown(Keys.Shift)){
        window.rtCamera.setFreeMove(true);
        window.mainCamera.setFreeMove(false);
    }else{
        window.mainCamera.setFreeMove(true);
        window.rtCamera.setFreeMove(false);
    }

    if(Input.isKeyDown(Keys.RightArrow)){
        window.lightIndicator.localPosition[0] -= 0.1;
    }
    if(Input.isKeyDown(Keys.LeftArrow)){
        window.lightIndicator.localPosition[0] += 0.1;
    }
    if(Input.isKeyDown(Keys.UpArrow)){
        window.lightIndicator.localPosition[1] += 0.1;
    }
    if(Input.isKeyDown(Keys.DownArrow)){
        window.lightIndicator.localPosition[1] -= 0.1;
    }

    window.light.position[0] = window.lightIndicator.localPosition[0];
    window.light.position[1] = window.lightIndicator.localPosition[1];
    window.light.position[2] = window.lightIndicator.localPosition[2];    
}

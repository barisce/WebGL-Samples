function CubeMap(positiveXUrl, negativeXUrl, positiveYUrl, negativeYUrl, positiveZUrl, negativeZUrl){
    this.textureId = gl.createTexture();
    this.isLoaded = false;
    
    var textureCountToLoad = 6;

    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.textureId);

    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
   
    this.loadFace = function(face, url){
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.textureId);

        //placeholder until image is loaded
        gl.texImage2D(face, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([127, 127, 255, 255]));

        var img = new Image();
        img.crossOrigin = "anonymous"; 

        var targetFace = face;
        var targetTextureId = this.textureId;
        var cubeMap = this;

        img.addEventListener('load', function() {
            textureCountToLoad--;
            if(textureCountToLoad==0)
                cubeMap.isLoaded = true;

            gl.bindTexture(gl.TEXTURE_CUBE_MAP, targetTextureId);
            gl.texImage2D(targetFace, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        });
    
        img.src = url;
    }

    this.loadFace(gl.TEXTURE_CUBE_MAP_POSITIVE_X, positiveXUrl);
    this.loadFace(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, negativeXUrl);
    this.loadFace(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, positiveYUrl);
    this.loadFace(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, negativeYUrl);
    this.loadFace(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, positiveZUrl);
    this.loadFace(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, negativeZUrl);

}
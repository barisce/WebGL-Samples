function RenderTexture(width=512, height=512){

    //create an empty texture
    this.textureId = gl.createTexture();
    //create a framebuffer object
    this.frameBuffer = gl.createFramebuffer();
    //A buffer attachment to an FBO is called a renderbuffer
    //We don't need a renderbuffer attachment for colorbuffer because we can render directly into a texture
    //We need a depth buffer, since we have a 3D scene
    this.depthBuffer = gl.createRenderbuffer();

    this.width = width;
    this.height = height;

    //set up texture object with a null image
    gl.bindTexture(gl.TEXTURE_2D, this.textureId);  
    var level = 0;
    var internalFormat = gl.RGBA;
    var border = 0;
    var format = gl.RGBA;
    var type = gl.UNSIGNED_BYTE;
    var data = null;
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, format, type, data); 
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
    //attach the texture to the fbo's color buffer
    //can also use gl.DEPTH_ATTACHMENT or gl.STENCIL_ATTACHMENT
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.textureId, level);
    
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer);   
    //specifies the depth and resolution of the depth buffer  
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
    //attach the depthbuffer to frame buffer object
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthBuffer);

    var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
        alert("Framebuffer Not Complete");
    }
}
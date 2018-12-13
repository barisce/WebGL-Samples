function Program(vertexShaderElementId, fragmentShaderElementId, projectionMatrixUniformName="uPMatrix", modelViewMatrixUniformName="uMVMatrix"){
    
        var vertexShaderSource = document.getElementById(vertexShaderElementId).innerHTML;
        var fragmentShaderSource = document.getElementById(fragmentShaderElementId).innerHTML;
    
        //compile shaders	
        var vertexShader = makeShader(vertexShaderSource, gl.VERTEX_SHADER);
        var fragmentShader = makeShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    
        //create program
        this.glProgram = gl.createProgram();
    
        //attach shaders to the program
        gl.attachShader(this.glProgram, vertexShader);
        gl.attachShader(this.glProgram, fragmentShader);
    
        gl.linkProgram(this.glProgram);
    
        if (!gl.getProgramParameter(this.glProgram, gl.LINK_STATUS)) {
            alert("Unable to initialize the shader program.");
        }
    
        this.projectionMatrixUniform = gl.getUniformLocation(this.glProgram, projectionMatrixUniformName);
        this.modelViewMatrixUniform = gl.getUniformLocation(this.glProgram, modelViewMatrixUniformName); 
    
    
        this.setVertexPositionAttributeName = function(vertexPositionAttributeName){
            this.vertexPositionAttribute = gl.getAttribLocation(this.glProgram, vertexPositionAttributeName);
        }
        
        this.setVertexColorAttributeName = function(vertexColorAttributeName){
            this.vertexColorAttribute = gl.getAttribLocation(this.glProgram, vertexColorAttributeName);
        }
    
        this.prepareRender = function(modelMatrix, camera){
            gl.useProgram(this.glProgram);
    
            gl.uniformMatrix4fv(this.projectionMatrixUniform, false, camera.projectionMatrix);
    
            var mvMatrix = mat4.create();
            mvMatrix = mat4.multiply(mvMatrix, camera.viewMatrix, modelMatrix);
            gl.uniformMatrix4fv(this.modelViewMatrixUniform, false, mvMatrix);
        }  
    }
                
    function makeShader(src, type){
        var shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
    
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
        }
        return shader;
    }
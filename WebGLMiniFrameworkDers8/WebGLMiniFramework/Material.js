function Material(program){
    this.program = program;

    this.customUniforms = {};

    this.draw = function(mesh, modelMatrix, camera){
        this.program.prepareRender(modelMatrix, camera);

        for(var uniformName in this.customUniforms){
            var uniformInfo = this.customUniforms[uniformName];
            if(uniformInfo.type == "Color")
                gl.uniform4fv(uniformInfo.uniformLocation, uniformInfo.value);          
        }  
        
        if(mesh.colorBuffer && this.program.vertexColorAttribute != -1){
            gl.bindBuffer(gl.ARRAY_BUFFER, mesh.colorBuffer);        
            gl.enableVertexAttribArray(this.program.vertexColorAttribute);
            gl.vertexAttribPointer(this.program.vertexColorAttribute, 3, gl.FLOAT, false, 0, 0);
        }

        if(mesh.textureCoordinateBuffer && this.program.textureCoordinateAttribute != -1){
            if(this.texture){
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this.texture.textureId);
                gl.uniform1i(this.program.textureUniform, 0);
            }

            gl.enableVertexAttribArray(this.program.textureCoordinateAttribute);
            gl.bindBuffer(gl.ARRAY_BUFFER, mesh.textureCoordinateBuffer);
            gl.vertexAttribPointer(this.program.textureCoordinateAttribute, 2, gl.FLOAT, false, 0, 0);
        }
      
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);        
        gl.enableVertexAttribArray(this.program.vertexPositionAttribute);
        gl.vertexAttribPointer(this.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);  
        gl.drawElements(gl.TRIANGLES, mesh.indicesCount, gl.UNSIGNED_SHORT, 0);
    }

    this.setCustomUniformColor = function(uniformName, color){
        var uniformLocation = gl.getUniformLocation(this.program.glProgram, uniformName);
        this.customUniforms[uniformName] = {
            type: "Color",
            value:color, 
            uniformLocation:uniformLocation, 
        };
    }

    this.setTexture = function(texture){
        this.texture = texture;
    }

}
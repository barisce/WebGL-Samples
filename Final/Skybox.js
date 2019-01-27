function Skybox(cubeMap){
    
        this.cubeMap = cubeMap;
        this.mesh = createSimpleBoxMesh(1000);
        this.program = new Program('skybox-vs', 'skybox-fs');
        this.program.setVertexPositionAttributeName("aVertexPosition");
        this.program.setTextureUniformName("cubeTexture");
        this.modelMatrix = mat4.create();
    
        this.render = function(camera){
            if(!this.cubeMap.isLoaded)
                return;
    
            //moves with the camera    
            mat4.identity(this.modelMatrix);
            mat4.translate(this.modelMatrix, this.modelMatrix, camera.position);   
            
            this.program.prepareRender(this.modelMatrix, camera);
    
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.cubeMap.textureId);
            gl.uniform1i(this.program.textureUniform, 0);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.vertexBuffer);        
            gl.enableVertexAttribArray(this.program.vertexPositionAttribute);
            gl.vertexAttribPointer(this.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer);  
            gl.drawElements(gl.TRIANGLES, this.mesh.indicesCount, gl.UNSIGNED_SHORT, 0);
        }
    
    }
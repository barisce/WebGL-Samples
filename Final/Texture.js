function Texture(url, wrapMode = gl.CLAMP_TO_EDGE){
    
        this.textureId = gl.createTexture();
    
        this.isLoaded = false;
    
        gl.bindTexture(gl.TEXTURE_2D, this.textureId);
        // Fill the texture with a 1x1 blue pixel.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
    
        // let's assume all images are not a power of 2
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapMode);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    
        var textureInfo = {
            width: 1,   // we don't know the size until it loads
            height: 1,
            textureId: this.textureId
        };
    
        var img = new Image();
        img.crossOrigin = "anonymous"; 
        
        var texture = this;
    
        img.addEventListener('load', function() {
            textureInfo.width = img.width;
            textureInfo.height = img.height;
        
            gl.bindTexture(gl.TEXTURE_2D, textureInfo.textureId);
            
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    
            texture.isLoaded = true;
    
            texture.setMipMap(texture.mipMapEnabled);
        });
    
        img.src = url;
    
        this.setAnisotropicFiltering = function(level = 16){
            var anisotropyExtension = gl.getExtension("EXT_texture_filter_anisotropic");
    
            if(!anisotropyExtension)
                return;
            
            var max = gl.getParameter(anisotropyExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    
            gl.bindTexture(gl.TEXTURE_2D, this.textureId);
    
            if(level==-1){
                level = max;
            }
            if(level>max)
                level = max;
    
            gl.texParameteri(gl.TEXTURE_2D, anisotropyExtension.TEXTURE_MAX_ANISOTROPY_EXT, level);
    
            if(level>1)
                this.setMipMap(true);
        }
    
        this.setMipMap = function(enabled){
            this.mipMapEnabled = enabled;
    
            gl.bindTexture(gl.TEXTURE_2D, textureInfo.textureId);
    
            if(this.mipMapEnabled){
                if(this.isLoaded && isPowerOf2(img.width) && isPowerOf2(img.height)){               
                    gl.generateMipmap(gl.TEXTURE_2D);
                    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER, gl.LINEAR);                
                }else{
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                }
            }else{
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        }
    
    }
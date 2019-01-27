function Light(lightType = LightType.Directional){
    
    this.type = lightType;
    this.attenuation = 0.015;

    if(this.type == LightType.Directional || this.type == LightType.Spot){
        this.direction = [0.0, 0.0, 0.0];
    }
    
    if(this.type == LightType.Point || this.type == LightType.Spot){
        this.position = [0.0, 0, 0];
    }

    if(this.type == LightType.Spot){
        this.innerLimit = 0.1;
        this.outerLimit = 2;
    }

    window.light = this;

    this.diffuseColor = [1.0 , 1.0 , 1.0 , 1.0];

    this.specularColor = [1.0 , 1.0 , 1.0 , 1.0];
    
    this.ambientColor = [0.2 , 0.2 , 0.2 , 1.0];

    this.sendLightTransformInfo = function(camera, program){
        if (this.isFreeMoveEnabled) {
            this.calculateLocalUpRightForward(this.direction, this.position, window.globalUp);
            this.freeMove();
        }

        if(this.type == LightType.Directional || this.type == LightType.Spot){
            var direction4 = [-this.direction[0], -this.direction[1], -this.direction[2], 0];
            mat4.multiply(direction4, camera.viewMatrix, direction4);
            var direction3 = [direction4[0],direction4[1],direction4[2]];
            program.setUniform3fv("uInverseLightDirection", direction3);
        }
        
        if(this.type == LightType.Point || this.type == LightType.Spot){
            program.setUniform3fv("uLightPosition", this.position);
        }

        if(this.type == LightType.Spot){
            program.setUniform1f("uInnerLimit", Math.cos(this.innerLimit));
            program.setUniform1f("uOuterLimit", Math.cos(this.outerLimit));
            program.setUniform3fv("aCameraPos", window.rtCamera.position);
        }
    };

    this.freeMove = function () {
        if (Input.isLocked && pressedKeys[Keys.Shift]) {
            this.direction = math.add(this.position, this.forward);

            this.direction = math.add(this.direction, math.multiply(Input.mouseDelta.x * 0.006, this.right));
            this.direction = math.add(this.direction, math.multiply(Input.mouseDelta.y * -0.006, this.up));

            if (Input.isKeyDown(Keys.W)) {
                this.position = math.add(this.position, math.multiply(0.1, this.forward));
                this.direction = math.add(this.direction, math.multiply(0.1, this.forward));
            }
            if (Input.isKeyDown(Keys.S)) {
                this.position = math.add(this.position, math.multiply(-0.1, this.forward));
                this.direction = math.add(this.direction, math.multiply(-0.1, this.forward));
            }

            if (Input.isKeyDown(Keys.A)) {
                this.position = math.add(this.position, math.multiply(-0.1, this.right));
                this.direction = math.add(this.direction, math.multiply(-0.1, this.right));
            }
            if (Input.isKeyDown(Keys.D)) {
                this.position = math.add(this.position, math.multiply(0.1, this.right));
                this.direction = math.add(this.direction, math.multiply(0.1, this.right));
            }
        }
    };

    this.calculateLocalUpRightForward = function (at, eye, up) {
        this.forward = math.subtract(eye, at);
        this.forward = math.divide(this.forward, math.norm(this.forward));
        this.forward = math.multiply(-1, this.forward);

        this.right = math.cross(up, this.forward);
        this.right = math.divide(this.right, math.norm(this.right));

        this.up = math.cross(this.forward, this.right);
    }
}

window.LightType = {
    Directional : 0,
    Point : 1,
    Spot : 2
};
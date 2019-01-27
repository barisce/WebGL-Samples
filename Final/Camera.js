window.globalUp = [0, 1, 0];

function Camera(renderTexture=null, backgroundColor=[0.0, 0.0, 0.0, 1.0]) {
    if (renderTexture) {
        if (!window.renderTextureCameras)
            window.renderTextureCameras = [];

        window.renderTextureCameras.push(this);
        this.renderTexture = renderTexture;
        this.aspect = this.renderTexture.width / this.renderTexture.height;
    } else {
        window.mainCamera = this;
        this.aspect = canvas.width / canvas.height;
    }

    this.position = [0, 0, 0];
    this.lookAt = [0, 0, 0];

    this.near = 0.1;
    this.far = 1000.0;
    this.fieldOfViewY = 45;

    this.viewMatrix = mat4.create(), this.projectionMatrix = mat4.create();

    this.ignoredSceneObjects = [];

    this.update = function () {
        if (this.isFreeMoveEnabled) {
            this.freeMove();
        }

        this.clearScene();
        this.viewMatrix = this.calculateViewMatrix(this.lookAt, this.position, window.globalUp);

        if (this.skybox)
            this.skybox.render(this);

        drawSceneObjects(this);
        drawParticleSystems(this);
    };

    this.clearScene = function () {
        if (this.renderTexture) {
            //for rendering to renderTexture's frameBuffer
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.renderTexture.frameBuffer);
            gl.viewport(0, 0, this.renderTexture.width, this.renderTexture.height);
            window.Camera.activeRenderTexture = this.renderTexture;
        }
        else {
            //for directly rendering to canvas
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, canvas.width, canvas.height);
            window.Camera.activeRenderTexture = null;
        }

        gl.clearColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], backgroundColor[3]);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        mat4.perspective(this.projectionMatrix, this.fieldOfViewY, this.aspect, this.near, this.far);
    };

    this.calculateViewMatrix = function (at, eye, up) {
        this.forward = math.subtract(eye, at);
        this.forward = math.divide(this.forward, math.norm(this.forward));
        this.right = math.cross(up, this.forward);
        this.right = math.divide(this.right, math.norm(this.right));
        this.up = math.cross(this.forward, this.right);

        eyeDotU = -math.dot(eye, this.right);
        eyeDotV = -math.dot(eye, this.up);
        eyeDotN = -math.dot(eye, this.forward);

        var n = [];
        n.push(this.forward[0]);
        n.push(this.forward[1]);
        n.push(this.forward[2]);

        var u = [];
        u.push(this.right[0]);
        u.push(this.right[1]);
        u.push(this.right[2]);

        var v = [];
        v.push(this.up[0]);
        v.push(this.up[1]);
        v.push(this.up[2]);

        u.push(eyeDotU);
        v.push(eyeDotV);
        n.push(eyeDotN);

        var viewMatrix = mat4.fromValues(u[0], u[1], u[2], u[3], v[0], v[1], v[2], v[3], n[0], n[1], n[2], n[3], 0, 0, 0, 1);
        var viewMatrix = mat4.transpose(viewMatrix, viewMatrix);

        this.forward = math.multiply(-1, this.forward);

        return viewMatrix;
    }

    this.setSkybox = function (skybox) {
        this.skybox = skybox;
    }

    this.setFreeMove = function (enabled) {
        this.isFreeMoveEnabled = enabled;
    }

    this.ignoreSceneObject = function (sceneObject) {
        this.ignoredSceneObjects.push(sceneObject);
    }

    this.freeMove = function () {
        if (Input.isLocked && !pressedKeys[Keys.Shift]) {
            this.lookAt = math.add(this.position, this.forward);

            this.lookAt = math.add(this.lookAt, math.multiply(Input.mouseDelta.x * 0.006, this.right));
            this.lookAt = math.add(this.lookAt, math.multiply(Input.mouseDelta.y * -0.006, this.up));

            if (Input.isKeyDown(Keys.W)) {
                this.position = math.add(this.position, math.multiply(0.1, this.forward));
                this.lookAt = math.add(this.lookAt, math.multiply(0.1, this.forward));
            }
            if (Input.isKeyDown(Keys.S)) {
                this.position = math.add(this.position, math.multiply(-0.1, this.forward));
                this.lookAt = math.add(this.lookAt, math.multiply(-0.1, this.forward));
            }

            if (Input.isKeyDown(Keys.A)) {
                this.position = math.add(this.position, math.multiply(-0.1, this.right));
                this.lookAt = math.add(this.lookAt, math.multiply(-0.1, this.right));
            }
            if (Input.isKeyDown(Keys.D)) {
                this.position = math.add(this.position, math.multiply(0.1, this.right));
                this.lookAt = math.add(this.lookAt, math.multiply(0.1, this.right));
            }
        }
    }
}
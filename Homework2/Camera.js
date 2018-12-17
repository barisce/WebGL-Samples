window.globalUp = [0, 1, 0];

function Camera() {
    window.mainCamera = this;

    this.position = [0, 0, 0];
    this.lookAt = [0, 0, 0];

    this.near = 0.1;
    this.far = 100.0;
    this.fieldOfViewY = 45;
    this.aspect = canvas.width / canvas.height;

    this.viewMatrix = mat4.create();
    this.projectionMatrix = mat4.create();

    this.update = function () {
        this.clearScene();
        this.viewMatrix = this.calculateViewMatrix(this.lookAt, this.position, window.globalUp);
    };

    // this function casts a ray from given coordinates of the screen to world space and returns the ray
    this.raycast = function (mousePosX, mousePosY, mousePosZ) {
        // mousePosZ is either 0 (near plane), 1 (far plane) or somewhere in between.
        mousePosX = parseFloat(mousePosX);
        mousePosY = parseFloat(mousePosY);
        mousePosZ = parseFloat(mousePosZ);

        var inf = [];
        // Shallow copying matrices without references so that our view doesn't effect from it.
        var iViewMatrix = Object.assign({}, this.viewMatrix);

        // inverse view matrix
        mat4.invert(iViewMatrix, iViewMatrix);

        // Transformation of normalized coordinates between -1 and 1
        inf[0] = (mousePosX / canvas.width) * 2.0 - 1.0;
        inf[1] = (mousePosY / canvas.height) * 2.0 - 1.0;
        inf[2] = 2.0 * mousePosZ - 1.0;
        inf[3] = 1.0;

        csDirec = [inf[0] / this.projectionMatrix[0], inf[1] / this.projectionMatrix[5], -1];
        //Start point
        wsStart = [iViewMatrix[3],iViewMatrix[7],iViewMatrix[11]];
        //Ray Direction
        wsDirec = [csDirec[0]*iViewMatrix[0] + csDirec[1]*iViewMatrix[1] + csDirec[2]*iViewMatrix[2],
                   csDirec[0]*iViewMatrix[4] + csDirec[1]*iViewMatrix[5] + csDirec[2]*iViewMatrix[6],
                   csDirec[0]*iViewMatrix[8] + csDirec[1]*iViewMatrix[9] + csDirec[2]*iViewMatrix[10]];

        //return RayCasting info
        return [csDirec,wsStart,wsDirec];
    };

    this.clearScene = function () {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        gl.viewport(0, 0, canvas.width, canvas.height);
        mat4.perspective(this.projectionMatrix, this.fieldOfViewY, this.aspect, this.near, this.far);
    };

    this.calculateViewMatrix = function (at, eye, up) {
        n = math.subtract(eye, at);
        n = math.divide(n, math.norm(n));
        u = math.cross(up, n);
        u = math.divide(u, math.norm(u));
        v = math.cross(n, u);

        eyeDotU = -math.dot(eye, u);
        eyeDotV = -math.dot(eye, v);
        eyeDotN = -math.dot(eye, n);

        u.push(eyeDotU);
        v.push(eyeDotV);
        n.push(eyeDotN);

        var viewMatrix = mat4.fromValues(u[0], u[1], u[2], u[3], v[0], v[1], v[2], v[3], n[0], n[1], n[2], n[3], 0, 0, 0, 1);
        var viewMatrix = mat4.transpose(viewMatrix, viewMatrix);

        return viewMatrix;
    }
}

// function that multiplies matrix with Vec4
mat4.multiplyVec4 = function(mat, vec, dest) {
    if(!dest) { dest = vec }

    var x = vec[0], y = vec[1], z = vec[2], w = vec[3];

    dest[0] = mat[0]*x + mat[4]*y + mat[8]*z + mat[12]*w;
    dest[1] = mat[1]*x + mat[5]*y + mat[9]*z + mat[13]*w;
    dest[2] = mat[2]*x + mat[6]*y + mat[10]*z + mat[14]*w;
    dest[3] = mat[3]*x + mat[7]*y + mat[11]*z + mat[15]*w;

    return dest;
};
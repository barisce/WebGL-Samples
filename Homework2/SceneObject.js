function SceneObject(mesh, material) {

    this.localPosition = [0, 0, 0];
    this.localEulerAngles = [-90, 0, 0];
    this.scale = [1, 1, 1];
    this.modelMatrix = mat4.create();

    this.mesh = mesh;
    this.material = material;

    this.centerPosition = mesh.calculateCenterOfMass();
    this.centerBoundingPosition = math.divide(math.add(mesh.getMinimumVertexValues(), mesh.getMaximumVertexValues()), 2);
    this.centerInversePosition = [-1 * this.centerPosition[0], -1 * this.centerPosition[1], -1 * this.centerPosition[2]];

    if (!window.sceneObjects) {
        window.sceneObjects = [];
    }
    window.sceneObjects.push(this);

    this.render = function (camera = window.mainCamera) {
        this.calculateModelMatrix();

        this.material.draw(this.mesh, this.modelMatrix, camera);
    };

    this.calculateModelMatrix = function () {

        mat4.identity(this.modelMatrix);

        mat4.translate(this.modelMatrix, this.modelMatrix, this.localPosition);
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, this.localEulerAngles[2] * (Math.PI / 180));
        mat4.rotateY(this.modelMatrix, this.modelMatrix, this.localEulerAngles[1] * (Math.PI / 180));
        mat4.rotateX(this.modelMatrix, this.modelMatrix, this.localEulerAngles[0] * (Math.PI / 180));
        mat4.scale(this.modelMatrix, this.modelMatrix, this.scale);
        mat4.translate(this.modelMatrix, this.modelMatrix, this.centerInversePosition);

        return this.modelMatrix;
    }
}

function drawSceneObjects() {
    for (var i = 0; i < window.sceneObjects.length; i++) {
        window.sceneObjects[i].render();
    }
}
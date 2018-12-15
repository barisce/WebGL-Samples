function Mesh(vertices, indices) {
    this.indicesCount = indices.length;

    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    this.setColors = function (colors) {
        this.colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    };

    this.calculateCenterOfMass = function () {
        var vertexPosSumX = 0;
        var vertexPosSumY = 0;
        var vertexPosSumZ = 0;

        var vLength = vertices.length / 3.0;

        for (var i = 0; i < vLength * 3; i += 3) {
            vertexPosSumX += vertices[i];
            vertexPosSumY += vertices[i + 1];
            vertexPosSumZ += vertices[i + 2];
        }

        return [vertexPosSumX / vLength, vertexPosSumY / vLength, vertexPosSumZ / vLength];
    };

    this.getMinimumVertexValues = function () {
        var vertexPosMinX = 1000000;
        var vertexPosMinY = 1000000;
        var vertexPosMinZ = 1000000;

        var vLength = vertices.length / 3.0;

        for (var i = 0; i < vLength * 3; i += 3) {
            if (vertices[i] < vertexPosMinX) {
                vertexPosMinX = vertices[i];
            }
            if (vertices[i + 1] < vertexPosMinY) {
                vertexPosMinY = vertices[i + 1];
            }
            if (vertices[i + 2] < vertexPosMinZ) {
                vertexPosMinZ = vertices[i + 2];
            }
        }

        return [vertexPosMinX, vertexPosMinY, vertexPosMinZ];
    };

    this.getMaximumVertexValues = function () {
        var vertexPosMaxX = -1000000;
        var vertexPosMaxY = -1000000;
        var vertexPosMaxZ = -1000000;

        var vLength = vertices.length / 3.0;

        for (var i = 0; i < vLength * 3; i += 3) {
            if (vertices[i] > vertexPosMaxX) {
                vertexPosMaxX = vertices[i];
            }
            if (vertices[i + 1] > vertexPosMaxY) {
                vertexPosMaxY = vertices[i + 1];
            }
            if (vertices[i + 2] > vertexPosMaxZ) {
                vertexPosMaxZ = vertices[i + 2];
            }
        }

        return [vertexPosMaxX, vertexPosMaxY, vertexPosMaxZ];
    };
}

function createPyramidMesh() {

    var triangleVertices = [
        //front face
        //bottom left to right,  to top
        0.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        2.0, 0.0, 0.0,
        0.5, 1.0, 0.0,
        1.5, 1.0, 0.0,
        1.0, 2.0, 0.0,

        //rear face
        0.0, 0.0, -2.0,
        1.0, 0.0, -2.0,
        2.0, 0.0, -2.0,
        0.5, 1.0, -2.0,
        1.5, 1.0, -2.0,
        1.0, 2.0, -2.0
    ];

    var triangleVerticeColors = [
        //front face	
         0.0, 0.0, 1.0,
         1.0, 1.0, 1.0,
         0.0, 0.0, 1.0,
         0.0, 0.0, 1.0,
         0.0, 0.0, 1.0,
         1.0, 1.0, 1.0,

        //rear face
         0.0, 1.0, 1.0,
         1.0, 1.0, 1.0,
         0.0, 1.0, 1.0,
         0.0, 1.0, 1.0,
         0.0, 1.0, 1.0,
         1.0, 1.0, 1.0
    ];

    var triangleVertexIndices = [
        //front face
        0,1,3,
        1,3,4,
        1,2,4,
        3,4,5,

        //rear face
        6,7,9,
        7,9,10,
        7,8,10,
        9,10,11,

        //left side
        0,3,6,
        3,6,9,
        3,5,9,
        5,9,11,

        //right side
        2,4,8,
        4,8,10,
        4,5,10,
        5,10,11,

        //bottom faces
        0,6,8,
        8,2,0
    ];

    var pyramidMesh = new Mesh(triangleVertices, triangleVertexIndices);
    pyramidMesh.setColors(triangleVerticeColors);
    return pyramidMesh;
}

function createBoxMesh() {
    var vertices = [
        //bottomFace
        -0.5,-0.5,-0.5,
        0.5,-0.5,-0.5,
        -0.5,-0.5,0.5,
        0.5,-0.5,-0.5,
        -0.5,-0.5,0.5,
        0.5,-0.5,0.5,


        //rightFace
        0.5,-0.5,-0.5,
        0.5,-0.5,0.5,
        0.5,0.5,0.5,
        0.5,-0.5,-0.5,
        0.5,0.5,0.5,
        0.5,0.5,-0.5,


        //topFace
        0.5,0.5,0.5,
        -0.5,0.5,0.5,
        0.5,0.5,-0.5,
        -0.5,0.5,0.5,
        -0.5,0.5,-0.5,
        0.5,0.5,-0.5,



        //rearFace
        -0.5,-0.5,0.5,
        0.5,-0.5,0.5,
        0.5,0.5,0.5,
        -0.5,-0.5,0.5,
        0.5,0.5,0.5,
        -0.5,0.5,0.5,



        //frontFace
        0.5,-0.5,-0.5,
        0.5,0.5,-0.5,
        -0.5,0.5,-0.5,
        -0.5,-0.5,-0.5,
        0.5,-0.5,-0.5,
        -0.5,0.5,-0.5,


        //leftFace
        -0.5,-0.5,-0.5,
        -0.5,-0.5,0.5,
        -0.5,0.5,0.5,
        -0.5,-0.5,-0.5,
        -0.5,0.5,0.5,
        -0.5,0.5,-0.5
    ];

    var indices = [];

    for (var i = 0; i < vertices.length / 3; i++) {
        indices[i] = i;
    }

    var boxMesh = new Mesh(vertices, indices);
    return boxMesh;
}

function createSphereMesh() {
    var vertices = [];
    for (var z = 0; z <= 360; z += 1) { //1, 5, 15 number of line draw
        vertices.push(130 * Math.cos(z * (Math.PI / 180)), 130 * Math.sin(z * (Math.PI / 180)), 0);
    }

    var indices = [];
    for (var i = 0; i < vertices.length / 3; i++) {
        indices[i] = i;
    }

    var sphereMesh = new Mesh(vertices, indices);
    return sphereMesh;
}

function loadObjMesh(objFileUrl, callback) {
    loadObjMeshes([objFileUrl], function (meshes) {
        callback(meshes[0]);
    });
}

function loadObjMeshes(objFileUrls, callback) {
    var objInfos = {};
    for (var i = 0; i < objFileUrls.length; i++) {
        objInfos[i] = objFileUrls[i];
    }
    OBJ.downloadMeshes(objInfos, function (objs) {
        var meshes = [];

        for (var key in objs) {
            var obj = objs[key];

            var mesh = new Mesh(obj.vertices, obj.indices);

            meshes[parseInt(key)] = mesh;
        }

        callback(meshes);
    });
}


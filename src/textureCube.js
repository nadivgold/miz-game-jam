function textureCube(name, path, cubeSize, alpha, scene) {
    var cubeTexture = new BABYLON.StandardMaterial("pillarTexture", scene);
    var textureImg  = new BABYLON.Color3(0, 0, 1)
    if(path){
        textureImg = new BABYLON.Texture(path, scene);
    }
    cubeTexture.diffuseTexture = textureImg;
    if(alpha){
        cubeTexture.diffuseTexture.hasAlpha = true;
        cubeTexture.backFaceCulling = true;
    }
    var columns = 6;  // 6 columns
    var rows = 1;  // 1 row
    var faceUV = new Array(6);
    for (var i = 0; i < 6; i++) {
        faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
    }
    var options = {
        faceUV: faceUV,
        wrap: true
    };
    var texturedBox = BABYLON.MeshBuilder.CreateBox(name, {...options, size:cubeSize}, scene);
    texturedBox.material = cubeTexture;
    return texturedBox;
}

export { textureCube }
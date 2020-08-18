function initBoxes(boxSize, boxPadding, minXY, maxXY, maxZ, scene){
    var boxParams = { height: boxSize, width: boxSize, depth: boxSize };
    var boxImpostorParams = { mass: 0.5 * boxSize, restitution: 0, friction: 1 };
    var boxMaterial = new BABYLON.StandardMaterial("boxMaterial");
    boxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    for (var x = minXY; x <= maxXY; x += boxSize + boxPadding) {
        for (var z = minXY; z <= maxXY; z += boxSize + boxPadding) {
            for (var y = boxSize / 2; y <= maxZ; y += boxSize) {
                var boxName = "box:" + x + ',' + y + ',' + z;
                var box = BABYLON.MeshBuilder.CreateBox(boxName, boxParams, scene);
                box.position = new BABYLON.Vector3(x, y, z);
                box.material = boxMaterial;
                box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, boxImpostorParams, scene);
                // physicsViewer.showImpostor(box.physicsImpostor);
            }
        }
    }
}

export { initBoxes };
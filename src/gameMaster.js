import { knobs } from './knobs.js';

function initBoxes(boxSize, boxPadding, minXY, maxXY, maxZ, scene){
    var boxes = []
    var boxParams = { height: boxSize, width: boxSize, depth: boxSize };
    var boxImpostorParams = { mass: 0.5 * boxSize, restitution: 0, friction: 1 };
    var boxMaterial = new BABYLON.StandardMaterial("boxMaterial");
    boxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    for (var x = minXY; x <= maxXY; x += boxSize + boxPadding) {
        for (var z = minXY; z <= maxXY; z += boxSize + boxPadding) {
            for (var y = boxSize / 2; y <= maxZ; y += boxSize) {
                var boxName = "box:" + x + ',' + y;
                var box = BABYLON.MeshBuilder.CreateBox(boxName, boxParams, scene);
                box.position = new BABYLON.Vector3(x, y, knobs.ents.dropHeight);
                box.material = boxMaterial;
                box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, boxImpostorParams, scene);
                // physicsViewer.showImpostor(box.physicsImpostor);
                knobs.ents.entArr.push(box);
            }
        }
    }
    return boxes;
}

function createWave(waveSize, scene){
    var boxParams = { height: 2, width: 2, depth: 2 };
    var boxImpostorParams = { mass: 0.5 * 2, restitution: 0, friction: 1 };
    var boxMaterial = new BABYLON.StandardMaterial("boxMaterial");
    boxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    for(var i = 0; i < waveSize; i++){
        var x = ((Math.random()*49) * (Math.round(Math.random()) ? -1 : 1));
        var z = ((Math.random()*49) * (Math.round(Math.random()) ? -1 : 1));
        var boxName = "box:" + x + ',' + z;
        var box = BABYLON.MeshBuilder.CreateBox(boxName, boxParams, scene);
        box.position = new BABYLON.Vector3(x, knobs.ents.dropHeight, z);
        box.material = boxMaterial;
        box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, boxImpostorParams, scene);
        // physicsViewer.showImpostor(box.physicsImpostor);
        knobs.ents.entArr.push(box);
        console.log(boxName)
    }
}

export { initBoxes, createWave};
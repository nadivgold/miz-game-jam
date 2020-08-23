import { knobs } from './knobs.js';
import { textureCube } from './textureCube.js';

function createEnt(scene, entID){
    const limit = ((0.5 * knobs.worldSize.worldx) - 1);
    const boxParams = { height: 2, width: 2, depth: 2 };
    switch (entID){
        case 1: //harder enemies
            var boxImpostorParams = { mass: 3, restitution: 0, friction: 1 };
            var x = ((Math.random()*limit) * (Math.round(Math.random()) ? -1 : 1));
            var z = ((Math.random()*limit) * (Math.round(Math.random()) ? -1 : 1));
            var boxName = "warrior:" + x + ',' + z;
            var box = textureCube(boxName, "https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/knight1.png", 2, true, scene);
            box.position = new BABYLON.Vector3(x, knobs.ents.dropHeight, z);
            box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, boxImpostorParams, scene);
            knobs.ents.entArr.push(box);
        break;
        case 2: //even harder enemies
            var boxImpostorParams = { mass: 3, restitution: 0, friction: 3 };
            var x = ((Math.random()*limit) * (Math.round(Math.random()) ? -1 : 1));
            var z = ((Math.random()*limit) * (Math.round(Math.random()) ? -1 : 1));
            var boxName = "wiz:" + x + ',' + z;
            var box = textureCube(boxName, "https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/wiz1.png", 2, true, scene);
            box.position = new BABYLON.Vector3(x, knobs.ents.dropHeight, z);
            box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, boxImpostorParams, scene);
            knobs.ents.entArr.push(box);
        break;
        case 3: // explosion radius up
            var boxImpostorParams = { mass: 1, restitution: 0, friction: 1 };
            var x = ((Math.random()*limit) * (Math.round(Math.random()) ? -1 : 1));
            var z = ((Math.random()*limit) * (Math.round(Math.random()) ? -1 : 1));
            var boxName = "radius:" + x + ',' + z;
            var box = textureCube(boxName, "https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/powerup1.png", 2, true, scene);
            box.position = new BABYLON.Vector3(x, knobs.ents.dropHeight, z);
            box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, boxImpostorParams, scene);
            knobs.ents.powerUpArr.push(box);
        break;
        case 4: // explosion strength up
            var boxImpostorParams = { mass: 1, restitution: 0, friction: 1 };
            var x = ((Math.random()*limit) * (Math.round(Math.random()) ? -1 : 1));
            var z = ((Math.random()*limit) * (Math.round(Math.random()) ? -1 : 1));
            var boxName = "strength:" + x + ',' + z;
            var box = textureCube(boxName, "https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/powerup2.png", 2, true, scene);
            box.position = new BABYLON.Vector3(x, knobs.ents.dropHeight, z);
            box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, boxImpostorParams, scene);
            knobs.ents.powerUpArr.push(box);
        break;
        case 5: // health up
            var boxImpostorParams = { mass: 1, restitution: 0, friction: 1 };
            var x = ((Math.random()*limit) * (Math.round(Math.random()) ? -1 : 1));
            var z = ((Math.random()*limit) * (Math.round(Math.random()) ? -1 : 1));
            var boxName = "health:" + x + ',' + z;
            var box = textureCube(boxName, "https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/powerup3.png", 2, true, scene);
            box.position = new BABYLON.Vector3(x, knobs.ents.dropHeight, z);
            box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, boxImpostorParams, scene);
            knobs.ents.powerUpArr.push(box);
        break;
        default: //standard enemies
            var boxImpostorParams = { mass: 1, restitution: 0, friction: 1 };
            var x = ((Math.random()*limit) * (Math.round(Math.random()) ? -1 : 1));
            var z = ((Math.random()*limit) * (Math.round(Math.random()) ? -1 : 1));
            var boxName = "skelly:" + x + ',' + z; 
            var box = textureCube(boxName, "https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/skelly.png", 2, true, scene);
            box.position = new BABYLON.Vector3(x, knobs.ents.dropHeight, z);
            box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, boxImpostorParams, scene);
            // physicsViewer.showImpostor(box.physicsImpostor);
            knobs.ents.entArr.push(box);
        break;
    }
}

function gameDirector(currTime, everyNSec, scene){
    if(((currTime - knobs.gameStartTime) %  everyNSec === 0)  && knobs.etc.waveLimit){ // creates a wave every 5 seconds
        knobs.etc.waveLimit = false;
        for(var i = 0; i < knobs.difficulty; i++){
            setTimeout(() => {
            var randomizer = (Math.random() * knobs.difficulty);
            console.log(randomizer)
            if(randomizer >= 0 && randomizer < 4)
                createEnt(scene, 0)
                createEnt(scene, 0)
            if(randomizer >= 4 && randomizer < 5)
                createEnt(scene, 5)
            if(randomizer >= 6 && randomizer < 9)
                createEnt(scene, 1)
            if(randomizer >= 9 && randomizer < 10)
                createEnt(scene, 3);
            if(randomizer >= 10 && randomizer < 14)
                createEnt(scene, 2);
            if(randomizer >= 15)
                createEnt(scene, 4);
        }, 0)
        }
        setTimeout(() => {
            knobs.etc.waveLimit = true;
        }, 3000)
    }
}

export { gameDirector};



// function initBoxes(boxSize, boxPadding, minXY, maxXY, maxZ, scene){
//     var boxes = []
//     var boxParams = { height: boxSize, width: boxSize, depth: boxSize };
//     var boxImpostorParams = { mass: 0.5 * boxSize, restitution: 0, friction: 1 };
//     var boxMaterial = new BABYLON.StandardMaterial("boxMaterial");
//     boxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
//     for (var x = minXY; x <= maxXY; x += boxSize + boxPadding) {
//         for (var z = minXY; z <= maxXY; z += boxSize + boxPadding) {
//             for (var y = boxSize / 2; y <= maxZ; y += boxSize) {
//                 var boxName = "box:" + x + ',' + y;
//                 var box = BABYLON.MeshBuilder.CreateBox(boxName, boxParams, scene);
//                 box.position = new BABYLON.Vector3(x, y, knobs.ents.dropHeight);
//                 box.material = boxMaterial;
//                 box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, boxImpostorParams, scene);
//                 // physicsViewer.showImpostor(box.physicsImpostor);
//                 knobs.ents.entArr.push(box);
//             }
//         }
//     }
//     return boxes;
// }
import { knobs } from "../knobs.js";
// import { handleEntCollision } from "../collision.js"

function handleControls(player, inputMap, deltaTime, explode, physicsHelper, scene){
    const limit = ((0.5 * knobs.worldSize.worldx) - 1);
    if(inputMap["a"] || inputMap["A"] || inputMap["ArrowLeft"]){
        if(player.position.x < limit)
            player.position.x += knobs.playerControls.playerMoveSpeed * deltaTime;
    }
    if(inputMap["w"]|| inputMap["W"] || inputMap["ArrowUp"]){
        if(player.position.z > (-1 * limit))
        // if(!handleEntCollision(player, new BABYLON.Vector3(0,0,-1), knobs.playerControls.rayLength, scene, deltaTime))
            player.position.z -= knobs.playerControls.playerMoveSpeed * deltaTime;
    }
    if(inputMap["d"]|| inputMap["D"] || inputMap["ArrowRight"]){
        if(player.position.x > (-1 * limit))
        // if(!handleEntCollision(player, new BABYLON.Vector3(-1,0,0), knobs.playerControls.rayLength, scene, deltaTime))
            player.position.x -= knobs.playerControls.playerMoveSpeed * deltaTime;
    }
    if(inputMap["s"]|| inputMap["S"] || inputMap["ArrowDown"]){
        if(player.position.z < limit)
        // if(!handleEntCollision(player, new BABYLON.Vector3(0,0,1), knobs.playerControls.rayLength, scene, deltaTime))
            player.position.z += knobs.playerControls.playerMoveSpeed * deltaTime;
    }
    if(inputMap[" "]){
        explode(knobs.explosion.radius, knobs.explosion.strength, player.position, knobs.explosion.duration, physicsHelper, scene);
    }     
    console.log("playerX: ", player.position.x, " playerZ: ", player.position.z)
}


export { handleControls };
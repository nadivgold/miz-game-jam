import { knobs } from "./knobs.js";
import { handlePlayerCollision } from "./collision.js"

function handleControls(player, inputMap, deltaTime, explode, physicsHelper, scene){
    if(inputMap["a"] || inputMap["A"] || inputMap["ArrowLeft"]){
        if(!handlePlayerCollision(player, new BABYLON.Vector3(1,0,0), knobs.playerControls.rayLength, scene, deltaTime))
            player.position.x += knobs.playerControls.playerMoveSpeed * deltaTime;
    }
    if(inputMap["w"]|| inputMap["W"] || inputMap["ArrowUp"]){
        if(!handlePlayerCollision(player, new BABYLON.Vector3(0,0,-1), knobs.playerControls.rayLength, scene, deltaTime))
            player.position.z -= knobs.playerControls.playerMoveSpeed * deltaTime;
    }
    if(inputMap["d"]|| inputMap["D"] || inputMap["ArrowRight"]){
        if(!handlePlayerCollision(player, new BABYLON.Vector3(-1,0,0), knobs.playerControls.rayLength, scene, deltaTime))
            player.position.x -= knobs.playerControls.playerMoveSpeed * deltaTime;
    }
    if(inputMap["s"]|| inputMap["S"] || inputMap["ArrowDown"]){
        if(!handlePlayerCollision(player, new BABYLON.Vector3(0,0,1), knobs.playerControls.rayLength, scene, deltaTime))
            player.position.z += knobs.playerControls.playerMoveSpeed * deltaTime;
    }
    if(inputMap[" "]){
        explode(knobs.explosion.radius, knobs.explosion.strength, player.position, knobs.explosion.duration, physicsHelper, scene);
    }     
}


export { handleControls };
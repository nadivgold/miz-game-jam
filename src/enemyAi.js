import { knobs } from "./knobs.js";

function handleAi(enemy, player, deltaTime, scene){
    if(Math.round(enemy.position.y) === 1){
        if(enemy.position.x < player.position.x ){
                enemy.position.x += knobs.enemyAi.slowMoveSpeed * deltaTime;
        }
        if(enemy.position.z > player.position.z){
                enemy.position.z -= knobs.enemyAi.slowMoveSpeed * deltaTime;
        }
        if(enemy.position.x > player.position.x ){
                enemy.position.x -= knobs.enemyAi.slowMoveSpeed * deltaTime;
        }
        if(enemy.position.z < player.position.z){
                enemy.position.z += knobs.enemyAi.slowMoveSpeed * deltaTime;
        }
    }
}

export {handleAi};
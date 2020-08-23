import { knobs } from "./knobs.js";

function handleAi(enemy, player, deltaTime, scene, ground){
    if(enemy.position.y <= 1.25 && !knobs.ents.removedEnts.includes(enemy.name) ){
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
    if(enemy.position.y < knobs.ents.killPlane && !knobs.ents.removedEnts.includes(enemy.name) ){
        knobs.score++;
        knobs.ents.removedEnts.push(enemy.name)
        scene.removeMesh(enemy);
        enemy.dispose();
        enemy = null;
        knobs.ents.totalEnts -= 1;
    }
}

export {handleAi};
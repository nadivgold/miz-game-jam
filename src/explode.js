import { knobs } from "./knobs.js";
import { playerTextureSwitcher } from "./textureAnimPlayer.js";

function explode(player, origin, duration, physicsHelper, bomb, scene){
    if(knobs.explosion.enabled){
        bomb.play();
        knobs.explosion.enabled = 0;
        var event = physicsHelper.applyRadialExplosionImpulse( // or .applyRadialExplosionForce
            origin,
            {
                radius: knobs.explosion.radius,
                strength:  knobs.explosion.strength,
                falloff: BABYLON.PhysicsRadialImpulseFalloff.Linear, // or BABYLON.PhysicsRadialImpulseFalloff.Constant
            }
        );

        // Debug
        var eventData = event.getData();
        var debugData = showExplosionDebug(eventData, scene);
        setTimeout(function (debugData) {
            hideExplosionDebug(debugData);
            event.dispose(); // we need to cleanup/dispose, after we don't use the data anymore
        }, duration, debugData);
        // Debug - END
        setTimeout(() => {
            knobs.explosion.enabled = 1;
            player.material = playerTextureSwitcher("player","https://raw.githubusercontent.com/nadivgold/miz-game-jam/master/assets/player1.png", 1, true, scene);
        }, knobs.explosion.timeout);
    } 
}


 // Helpers
 function addMaterialToMesh(sphere, scene) {
    var sphereMaterial = new BABYLON.StandardMaterial("sphereMaterial", scene);
    sphereMaterial.alpha = 0.5;
    sphere.material = sphereMaterial;
}

function showExplosionDebug(data, scene) {
    addMaterialToMesh(data.sphere, scene);
    data.sphere.isVisible = true;

    return {
        sphere: data.sphere,
    };
}

function hideExplosionDebug(debugData) {
    debugData.sphere.isVisible = false;
}

export { explode };
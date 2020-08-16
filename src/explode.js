function explode(radius, strength, origin, duration, physicsHelper, scene){
    var event = physicsHelper.applyRadialExplosionImpulse( // or .applyRadialExplosionForce
        origin,
        {
            radius: radius,
            strength: strength,
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
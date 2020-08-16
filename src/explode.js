function explode(radius, strength, origin, duration, physicsHelper){
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
    var debugData = showExplosionDebug(eventData);
    setTimeout(function (debugData) {
        hideExplosionDebug(debugData);
        event.dispose(); // we need to cleanup/dispose, after we don't use the data anymore
    }, duration, debugData);
    // Debug - END
}
 // Helpers
 function addMaterialToMesh(sphere) {
    var sphereMaterial = new BABYLON.StandardMaterial("sphereMaterial", scene);
    sphereMaterial.alpha = 0.5;
    sphere.material = sphereMaterial;
}

function showExplosionDebug(data) {
    addMaterialToMesh(data.sphere);
    data.sphere.isVisible = true;

    return {
        sphere: data.sphere,
    };
}

function hideExplosionDebug(debugData) {
    debugData.sphere.isVisible = false;
}

export { explode };